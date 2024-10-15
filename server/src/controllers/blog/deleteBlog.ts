import { Response } from "express";
import { CustomRequest, User } from "../../types/types";
import { db } from "../../firebase.config";

export interface DeleteBlogRequestBody {
    blogId: string;
}

export const deleteBlog = async (req: CustomRequest<DeleteBlogRequestBody>, res: Response): Promise<any> => {
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

        const { blogId } = req.body;

        if (!blogId) {
            return res.status(400).json({
                success: false,
                message: 'Blog ID is required.',
            });
        }

        const blogRef = db.collection('blogs').doc(blogId);
        const blogDoc = await blogRef.get();

        if (!blogDoc.exists) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found.',
            });
        }

        const blogData = blogDoc.data();
        if (blogData?.userId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this blog.',
            });
        }

        await blogRef.delete();

        const userBlogs = userDoc.data()?.blogs || [];

        const updatedBlogs = userBlogs.filter((id: string) => id !== blogId);
        await userRef.update({
            blogs: updatedBlogs,
        });

        return res.status(200).json({
            success: true,
            message: 'Blog deleted successfully and removed from user profile.',
        });

    } catch (error) {
        console.log(`Error in Delete Blog: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
