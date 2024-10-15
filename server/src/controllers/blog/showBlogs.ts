import { Request, Response } from "express";
import { db } from "../../firebase.config";

export const showBlogs = async (req: Request, res: Response): Promise<any> => {
    try {
        const blogRef = db.collection('blogs').orderBy('createdAt', 'desc');
        const snapshot = await blogRef.get();
        const blogDetails: any[] = [];

        for (const doc of snapshot.docs) {
            const blogData = doc.data();
            const userId = blogData.userId;

            if (!userId || typeof userId !== 'string') {
                console.log(`Invalid userId for blog ${doc.id}`);
                continue;
            }

            const userRef = db.collection('users').doc(userId);
            const userSnapshot = await userRef.get();
            const userData = userSnapshot.exists ? userSnapshot.data() : null;

            blogDetails.push({
                blogId: doc.id,
                ...blogData,
                user: {
                    name: userData?.name || 'Unknown User',
                    avatar: userData?.avatar || 'default-image-url',
                },
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Blog Data Retrieved',
            data: blogDetails,
        });

    } catch (error) {
        console.log(`Error in Show Blogs: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

