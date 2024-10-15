import { Response } from "express";
import { Blog, CustomRequest } from "../../types/types";
import { db } from "../../firebase.config";
import { uploadBlogImage } from "../../utils/uploadBlogImage";
import { firestore } from "firebase-admin";

const extractBase64Images = (content: string) => {
    const regex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"/g;
    const matches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        matches.push({
            type: match[1],
            data: match[2],
        });
    }

    return matches;
};

export const writeBlog = async (req: CustomRequest<Blog>, res: Response): Promise<any> => {
    try {
        const { userId } = req;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.',
            });
        }

        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (!userDoc.exists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const { title, content } = req.body;

        const base64Images = extractBase64Images(content);
        let updatedContent = content;

        for (const image of base64Images) {
            const imageUrl = await uploadBlogImage(image.data, image.type);
            const base64String = `data:image/${image.type};base64,${image.data}`;
            updatedContent = updatedContent.replace(base64String, imageUrl);
        }

        const blogData = {
            userId,
            title,
            content: updatedContent,
            createdAt: firestore.FieldValue.serverTimestamp(),
        };

        const blogDocRef = await db.collection('blogs').add(blogData);

        await userRef.update({
            blogs: firestore.FieldValue.arrayUnion(blogDocRef.id),
            updatedAt: firestore.FieldValue.serverTimestamp(),
        });

        return res.status(200).json({
            success: true,
            message: "Blog created successfully",
            blogId: blogDocRef.id,
        });
    } catch (error) {
        console.error(`Error in writeBlog: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
