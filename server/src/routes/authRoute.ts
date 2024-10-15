import express, { Router } from 'express';
import { register } from '../controllers/auth/register';
import { login } from '../controllers/auth/login';
import { refreshAccessToken } from '../controllers/auth/refreshAccessToken';
import { profileSetup } from '../controllers/auth/profileSetup';
import verifyToken from '../middleware/verifyToken';
import { upload } from '../middleware/uploadImage';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh_token', refreshAccessToken);

router.patch('/profile_setup', verifyToken, upload.single('avatar'), profileSetup);

export default router;
