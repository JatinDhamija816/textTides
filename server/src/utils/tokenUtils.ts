import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '15m';

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error('JWT secret keys must be set in the environment variables');
}

export const generateAccessToken = (id: string): string => {
    return jwt.sign({ id }, accessTokenSecret, { expiresIn: accessTokenExpiry });
}

export const generateRefreshToken = (id: string): string => {
    return jwt.sign({ id }, refreshTokenSecret, { expiresIn: refreshTokenExpiry });
}

export const checkRefreshToken = (token: string): boolean => {
    try {
        jwt.verify(token, refreshTokenSecret);
        return true;
    } catch (error) {
        console.error('Invalid refresh token:', error);
        return false;
    }
}
