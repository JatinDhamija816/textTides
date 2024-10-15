import axios from "axios";
import { User } from "../types";
import Cookies from "js-cookie";
import { getValidAccessToken } from '../tokenUtils'

const API_URL = 'http://localhost:8000/api/v1';

export const register = async (user: User) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, user, { withCredentials: true });

        const { accessToken, refreshToken } = res.data;

        Cookies.set('accessToken', accessToken, { expires: 7, secure: true });
        Cookies.set('refreshToken', refreshToken, { expires: 30, secure: true });

        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const login = async (identifier: string, password: string) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, { identifier, password }, { withCredentials: true });

        const { accessToken, refreshToken } = res.data;

        Cookies.set('accessToken', accessToken, { expires: 7, secure: true });
        Cookies.set('refreshToken', refreshToken, { expires: 30, secure: true });

        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const profileSetup = async (formData: FormData) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.patch(`${API_URL}/auth/profile_setup`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const verifyEmail = async (identifier: string) => {
    try {
        const res = await axios.post(`${API_URL}/forgotPassword/verifyIdentifier`, { identifier })
        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const verifyOtp = async (identifier: string, otp: string) => {
    try {
        const res = await axios.post(`${API_URL}/forgotPassword/verifyOTP`, { identifier, otp })
        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const forgotPassword = async (identifier: string, password: string, confirmPassword: string) => {
    try {
        const res = await axios.patch(`${API_URL}/forgotPassword/resetPassword`, { identifier, password, confirmPassword })
        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const homePage = async () => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.get(`${API_URL}/profile/home_page`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const updateProfile = async (formData: FormData) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.patch(`${API_URL}/profile/updateProfile`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const updateEmail = async (email: string) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.patch(`${API_URL}/profile/updateEmail`, { email }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const writeBlog = async (title: string, content: string) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.post(`${API_URL}/blog/writeBlog`, { title, content }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const showBlogs = async () => {
    try {
        const res = await axios.get(`${API_URL}/blog/showBlogs`)
        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const getBlogsByUserId = async () => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.get(`${API_URL}/blog/getBlogsByUserId`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const deleteBlog = async (blogId: string) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.delete(`${API_URL}/blog/deleteBlog`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
            data: { blogId },
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Something went wrong" };
    }
};
