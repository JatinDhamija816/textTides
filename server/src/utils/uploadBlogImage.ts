import { bucket } from "../firebase.config";
import { v4 as uuidv4 } from 'uuid';

export const uploadBlogImage = async (base64Image: string, imageType: string): Promise<string> => {
    try {
        const buffer = Buffer.from(base64Image, "base64");  // Convert base64 to buffer
        const fileName = `blog-images/${Date.now()}_${uuidv4()}.${imageType}`;  // Create a unique file name
        const blob = bucket.file(fileName);

        // Use a stream to upload the buffer as a file
        await new Promise<void>((resolve, reject) => {
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: `image/${imageType}`,
                },
            });

            blobStream.on('error', (err) => {
                console.error('Image upload error:', err);
                reject(err);
            });

            blobStream.on('finish', resolve);
            blobStream.end(buffer);
        });

        // Generate a public URL for the uploaded image
        const [imageURL] = await blob.getSignedUrl({
            action: 'read',
            expires: '03-01-2500',
        });

        return imageURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
};
