import { Request, Response } from "express";
import { db } from "../../firebase.config";
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';
import { sendOtpEmail } from "../../utils/sendOTP";
import { getUserByIdentifier } from "../../utils/checkIdentifier";
import { EMAIL_REGEX, OTP_EXPIRY_TIME, OTP_LENGTH } from "../../utils/constants";


const generateOtp = (length: number): string => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
};

const updateUserOtp = async (userId: string, otp: string): Promise<void> => {
    const otpExpiry = admin.firestore.Timestamp.fromDate(new Date(Date.now() + OTP_EXPIRY_TIME));
    const timestamp = firestore.FieldValue.serverTimestamp();

    await db.collection('users').doc(userId).update({
        otp,
        otpExpiry,
        updatedAt: timestamp,
    });
};

export const verifyIdentifier = async (req: Request, res: Response): Promise<any> => {
    try {
        const { identifier }: { identifier: string } = req.body;

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
                message: "If the account exists, an OTP has been sent.",
            });
        }

        const userId = userDoc.id;
        const user = userDoc.data();

        const otp = generateOtp(OTP_LENGTH);
        await updateUserOtp(userId, otp);

        await sendOtpEmail(user.email, otp);

        return res.status(200).json({
            success: true,
            message: "If the account exists, an OTP has been sent.",
        });

    } catch (error) {
        console.error("Error verifying user identifier:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};
