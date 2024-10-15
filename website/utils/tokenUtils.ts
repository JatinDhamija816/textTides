import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://localhost:8000/api/v1';

interface DecodedToken {
    exp: number;
}

const EXPIRATION_BUFFER = 60;

const isTokenExpired = (token: string): boolean => {
    if (!token) return true;

    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime - EXPIRATION_BUFFER;
    } catch (error) {
        return true;
    }
};

const refreshAccessToken = async (): Promise<string | false> => {
    const refreshToken = Cookies.get('refreshToken');

    if (!refreshToken) {
        return false;
    }

    try {
        const response = await axios.post(`${API_URL} /auth/refresh - token`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        Cookies.set('accessToken', accessToken, { expires: 7, secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', newRefreshToken, { expires: 30, secure: true, sameSite: 'Strict' });

        return accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);

        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        return false;
    }
};

export const getValidAccessToken = async (): Promise<string | null | undefined> => {
    let accessToken = Cookies.get('accessToken');

    if (!accessToken || isTokenExpired(accessToken)) {
        const refreshed = await refreshAccessToken();

        if (!refreshed) {
            handleTokenFailure();
            return null;
        }

        accessToken = Cookies.get('accessToken');
    }

    return accessToken;
};

const handleTokenFailure = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/login';
};

