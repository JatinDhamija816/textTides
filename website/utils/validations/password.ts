import { PASSWORD_REGEX } from "../constants";
import { Error } from "../types";

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

export const passwordValidate = (password: string, confirmPassword: string): Error[] => {
    const errors: Error[] = [];

    password = password?.trim()
    confirmPassword = confirmPassword?.trim()

    if (!password) {
        errors.push({ field: 'password', message: 'Password is required' });
    } else if (!PASSWORD_REGEX.test(password)) {
        errors.push({ field: 'password', message: `Password must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character` });
    }

    if (password !== confirmPassword) {
        errors.push({ field: 'confirmPassword', message: 'Password and confirm password do not match' });
    }

    return errors;
}
