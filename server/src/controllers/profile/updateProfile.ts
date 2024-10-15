import { Response } from "express";
import { CustomRequest, User } from "../../types/types";
import { db } from "../../firebase.config";
import { deleteAvatarFromStorage } from "../../db/deleteAvatar";
import { uploadProfilePic } from "../../utils/uploadProfilePic";
import { firestore } from "firebase-admin";

export const updateProfile = async (req: CustomRequest<User>, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const { name, bio, removeAvatar } = req.body;
        const avatar = req.file;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User id required',
            });
        }

        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();
        const userData = userDoc.data() as User;

        const updates: Partial<User> = {};

        if (name) updates.name = name;
        if (bio) updates.bio = bio;

        if (removeAvatar && userData.avatar) {
            await deleteAvatarFromStorage(userData.avatar);
            updates.avatar = "";
        }

        if (avatar) {
            if (userData.avatar) {
                await deleteAvatarFromStorage(userData.avatar);
            }

            const newAvatarURL = await uploadProfilePic(avatar, userId);
            updates.avatar = newAvatarURL;
        }

        const timestamp = firestore.FieldValue.serverTimestamp();
        await userRef.update({
            ...updates,
            updatedAt: timestamp,
        });

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });

    } catch (error) {
        console.log(`Error in Update Profile ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
