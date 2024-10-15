import { Request } from 'express';

export interface CustomRequest<T = any> extends Request {
    body: T;
    userId?: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    username?: string;
    avatar?: string;
    bio?: string;
    removeAvatar?: boolean
    blogs: []
}

export interface Error {
    field: string;
    message: string;
}

export interface Blog {
    title: string;
    content: string;
    blogId?: string
}
