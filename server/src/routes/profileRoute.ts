import express, { Router } from 'express';
import { homePage } from '../controllers/profile/homePage';
import verifyToken from '../middleware/verifyToken';
import { upload } from '../middleware/uploadImage';
import { updateProfile } from '../controllers/profile/updateProfile';
import { updateEmail } from '../controllers/profile/updateEmail';

const router: Router = express.Router();

router.get('/home_page', verifyToken, homePage)
router.patch('/updateProfile', verifyToken, upload.single('avatar'), updateProfile)
router.patch('/updateEmail', verifyToken, updateEmail)

export default router;