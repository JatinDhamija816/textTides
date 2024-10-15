import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { checkRefreshToken, generateAccessToken, generateRefreshToken } from "../../utils/tokenUtils";

export const refreshAccessToken = (req: Request, res: Response): any => {
    try {
        const token = req.body.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            });
        }

        const isTokenValid = checkRefreshToken(token);
        if (!isTokenValid) {
            return res.status(400).json({
                success: false,
                message: 'Please login again'
            });
        }

        const decoded = jwt.decode(token);
        if (!decoded || typeof decoded !== 'object' || !decoded.id) {
            return res.status(400).json({
                success: false,
                message: 'Invalid token'
            });
        }

        const userId = (decoded as { id: string }).id;

        const accessToken = generateAccessToken(userId);
        const refreshToken = generateRefreshToken(userId);

        return res.status(200).json({
            success: true,
            message: 'New access token generated',
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error('Error generating new access token:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
