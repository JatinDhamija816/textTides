export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Error {
    field: string;
    message: string;
}