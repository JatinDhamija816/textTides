import { firestore } from "firebase-admin";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
export const OTP_EXPIRY_TIME = 10 * 60 * 1000;
export const OTP_LENGTH = 6;

export const timestamp = firestore.FieldValue.serverTimestamp();