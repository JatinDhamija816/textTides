import { Response } from "express";
import { CustomRequest, User, Blog } from "../../types/types";
import { db } from "../../firebase.config";

export const homePage = async (req: CustomRequest<User>, res: Response): Promise<any> => {
    try {
        const { userId } = req;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.',
            });
        }

        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const userProfile = userDoc.data() as User;
        const { name, email, username, avatar, bio, blogs } = userProfile;

        let blogDetails: Blog[] = [];

        if (blogs && blogs.length > 0) {
            const blogPromises = blogs.map(async (blogId) => {
                const blogDoc = await db.collection('blogs').doc(blogId).get();
                if (blogDoc.exists) {
                    const blogData = blogDoc.data() as Blog;
                    return { ...blogData, blogId };
                }
                return null;
            });

            blogDetails = (await Promise.all(blogPromises)).filter(Boolean) as Blog[];
        }

        return res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: {
                name,
                email,
                username,
                avatar,
                bio,
                blogDetails
            }
        });

    } catch (error: any) {
        console.error('Error retrieving user profile:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message || 'An unknown error occurred'
        });
    }
};
