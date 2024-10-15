import { db } from "../firebase.config";

export const getUserByIdentifier = async (identifier: string, isEmail: boolean) => {
    const userQuery = isEmail
        ? db.collection("users").where("email", "==", identifier)
        : db.collection("users").where("username", "==", identifier);

    const userSnapshot = await userQuery.get();
    return userSnapshot.empty ? null : userSnapshot.docs[0];
};
