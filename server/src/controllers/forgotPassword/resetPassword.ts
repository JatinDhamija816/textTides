import { Request, Response } from "express";
import { passwordValidate } from "../../utils/validations/passwordValidate";
import { EMAIL_REGEX, timestamp } from "../../utils/constants";
import { getUserByIdentifier } from "../../utils/checkIdentifier";
import { db } from "../../firebase.config";
import { hashPassword } from "../../utils/bcryptPassword";

const updateUserPassword = async (userId: string, password: string): Promise<void> => {
    await db.collection('users').doc(userId).update({
        password,
        updatedAt: timestamp,
    });
};

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { identifier, password, confirmPassword } = req.body;

        const passwordError = passwordValidate(password, confirmPassword);
        if (passwordError.length) {
            return res.status(400).json({
                success: false,
                errors: passwordError,
            });
        }

        const normalizedIdentifier = identifier.trim().toLowerCase();
        const isEmail = EMAIL_REGEX.test(normalizedIdentifier);

        const userDoc = await getUserByIdentifier(normalizedIdentifier, isEmail);
        if (!userDoc) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please check the (email or username) and try again.",
            });
        }

        const userId = userDoc.id;
        const hashedPassword = await hashPassword(password)
        await updateUserPassword(userId, hashedPassword);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully.",
        });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};
