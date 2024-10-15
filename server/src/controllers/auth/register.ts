import { Response } from "express";
import { CustomRequest, User } from "../../types/types";
import { registerValidate } from "../../utils/validations/registerValidate";
import { db } from "../../firebase.config";
import { Username } from "../../utils/usernameGenerator";
import { firestore } from 'firebase-admin';
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenUtils";
import { hashPassword } from "../../utils/bcryptPassword";

export const register = async (req: CustomRequest<User>, res: Response): Promise<any> => {
    try {
        const data = req.body;

        const registerError = registerValidate(data);
        if (registerError.length > 0) {
            return res.status(400).json({
                success: false,
                error: registerError
            });
        }

        const { name, email, password } = data;

        const existingEmail = await db.collection('users').where('email', '==', email.toLowerCase()).get();
        if (!existingEmail.empty) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        let username = Username(name);
        let usernameExists = await db.collection('users').where('username', '==', username.toLowerCase()).get();
        let attempts = 0;

        while (!usernameExists.empty && attempts < 5) {
            username = Username(name);
            usernameExists = await db.collection('users').where('username', '==', username.toLowerCase()).get();
            attempts++;
        }

        if (attempts >= 5) {
            return res.status(500).json({
                success: false,
                message: 'Unable to generate a unique username. Please try again.'
            });
        }

        const timestamp = firestore.FieldValue.serverTimestamp();
        const hashedPassword = await hashPassword(password)

        const userDocRef = await db.collection('users').add({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            username: username.toLowerCase(),
            createdAt: timestamp,
            updatedAt: timestamp
        });

        const accessToken = generateAccessToken(userDocRef.id);
        const refreshToken = generateRefreshToken(userDocRef.id);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            accessToken,
            refreshToken,
            username
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};
