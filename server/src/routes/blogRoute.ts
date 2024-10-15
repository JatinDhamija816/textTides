import express, { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import { writeBlog } from '../controllers/blog/writeBlog';
import { showBlogs } from '../controllers/blog/showBlogs';
import { deleteBlog } from '../controllers/blog/deleteBlog';

const router: Router = express.Router();

router.post('/writeBlog', verifyToken, writeBlog);
router.get('/showBlogs', showBlogs);
router.delete('/deleteBlog', verifyToken, deleteBlog);

export default router;
