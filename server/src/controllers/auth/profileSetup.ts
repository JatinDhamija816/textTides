import { Response } from "express";
import { CustomRequest, User } from "../../types/types";
import { db } from '../../firebase.config';
import { firestore } from 'firebase-admin';
import { uploadProfilePic } from "../../utils/uploadProfilePic";

export const profileSetup = async (req: CustomRequest<User>, res: Response): Promise<any> => {
    const userId = req.userId;
    const { bio } = req.body;
    const avatar = req.file;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'User ID is required.',
        });
    }

    try {
        const updates: Partial<User> = {};

        if (bio) updates.bio = bio;

        if (avatar) {
            updates.avatar = await uploadProfilePic(avatar, userId);
        }

        const timestamp = firestore.FieldValue.serverTimestamp();
        const userRef = db.collection('users').doc(userId);

        await userRef.update({
            ...updates,
            updatedAt: timestamp,
        });

        return res.status(200).json({
            success: true,
            message: 'Profile setup completed successfully',
        });
    } catch (error) {
        console.error('Error during profileSetup:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};