import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { CustomRequest } from '../types/types';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

interface DecodedToken {
    id: string;
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.cookies?.accessToken;

    if (!token) {
        res.status(403).json({ message: 'No token provided!' });
        return;
    }

    try {
        jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    error: (err as Error).message
                });
            }

            req.userId = (user as { id: string }).id;
            next();
        });
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized!' });
        return;
    }
};

export default verifyToken;
