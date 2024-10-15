import express, { response, Router } from 'express';
import { verifyIdentifier } from '../controllers/forgotPassword/verifyIdentifier';
import { verifyOTP } from '../controllers/forgotPassword/verifyOtp';
import { resetPassword } from '../controllers/forgotPassword/resetPassword';

const router: Router = express.Router();

router.post('/verifyIdentifier', verifyIdentifier)
router.post('/verifyOTP', verifyOTP)
router.patch('/resetPassword', resetPassword)

export default router;