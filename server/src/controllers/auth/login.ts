import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenUtils";
import { EMAIL_REGEX } from "../../utils/constants";
import { getUserByIdentifier } from "../../utils/checkIdentifier";

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { identifier, password }: { identifier: string, password: string } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const normalizedIdentifier = identifier.trim().toLowerCase();
        const isEmail = EMAIL_REGEX.test(normalizedIdentifier);

        const userDoc = await getUserByIdentifier(normalizedIdentifier, isEmail);

        if (!userDoc) {
            return res.status(200).json({
                success: true,
                message: "Invalid credentials",
            });
        }

        const user = userDoc.data();
        const userId = userDoc.id;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            accessToken,
            refreshToken
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
