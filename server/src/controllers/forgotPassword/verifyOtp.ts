import { Request, Response } from "express";
import { db } from "../../firebase.config";
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { getUserByIdentifier } from "../../utils/checkIdentifier";
import { EMAIL_REGEX } from "../../utils/constants";

const clearUserOtp = async (userId: string, timestamp: firestore.FieldValue): Promise<void> => {
    await db.collection('users').doc(userId).update({
        otp: null,
        otpExpiry: null,
        updatedAt: timestamp,
    });
};

export const verifyOTP = async (req: Request, res: Response): Promise<any> => {
    try {
        const { identifier, otp }: { identifier: string, otp: string } = req.body;

        if (!identifier) {
            return res.status(400).json({
                success: false,
                message: "Identifier (email or username) is required",
            });
        }

        const normalizedIdentifier = identifier.trim().toLowerCase();
        const isEmail = EMAIL_REGEX.test(normalizedIdentifier);

        const userDoc = await getUserByIdentifier(normalizedIdentifier, isEmail);

        if (!userDoc) {
            return res.status(200).json({
                success: true,
                message: "user not found",
            });
        }

        const userId = userDoc.id;
        const user = userDoc.data();

        const currentTime = admin.firestore.Timestamp.now();
        if (user.otp !== otp || user.otpExpiry.toMillis() < currentTime.toMillis()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired OTP.'
            });
        }

        const timestamp = firestore.FieldValue.serverTimestamp();
        await clearUserOtp(userId, timestamp);

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
        });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};
