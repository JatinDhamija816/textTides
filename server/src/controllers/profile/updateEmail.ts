import { Response } from "express";
import { CustomRequest, User } from "../../types/types";
import { db } from "../../firebase.config";
import { firestore } from "firebase-admin";

export const updateEmail = async (req: CustomRequest<User>, res: Response): Promise<any> => {
    try {
        const userId = req.userId;
        const { email } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            });
        }

        const userRef = db.collection('users').doc(userId);

        const timestamp = firestore.FieldValue.serverTimestamp();
        await userRef.update({
            email,
            updatedAt: timestamp,
        });

        return res.status(200).json({
            success: true,
            message: 'Email updated successfully',
        });

    } catch (error) {
        console.log(`Error in Update Email ${error}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
