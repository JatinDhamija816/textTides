import { bucket } from "../firebase.config";

export const deleteAvatarFromStorage = async (avatarUrl: string): Promise<void> => {

    try {
        const filePath = avatarUrl.split('/avatars/')[1].split('?')[0];

        const fullFilePath = `avatars/${decodeURIComponent(filePath)}`;
        const file = bucket.file(fullFilePath);

        await file.delete();

        console.log(`Avatar ${fullFilePath} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting avatar from storage:', error);
        throw new Error('Failed to delete avatar');
    }
};
