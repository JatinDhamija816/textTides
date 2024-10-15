import { bucket } from "../firebase.config";
import { v4 as uuidv4 } from 'uuid';

export const uploadProfilePic = async (avatar: Express.Multer.File, userId: string): Promise<string> => {
    try {
        const avatarFileName = `avatars/${userId}_${uuidv4()}`;
        const blob = bucket.file(avatarFileName);

        await new Promise<void>((resolve, reject) => {
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: avatar.mimetype,
                },
            });

            blobStream.on('error', (err) => {
                console.error('Avatar upload error:', err);
                reject(err);
            });

            blobStream.on('finish', resolve);
            blobStream.end(avatar.buffer);
        });

        const [avatarURL] = await blob.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
        });

        return avatarURL;
    } catch (error) {
        console.error('Error uploading avatar:', error);
        throw new Error('Failed to upload avatar');
    }
};