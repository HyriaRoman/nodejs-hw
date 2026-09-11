import { Router } from 'express';
import { updateUserAvatar } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.use('/users/me', authenticate);
router.patch('/users/me/avatar', (req, res, next) => {console.log(req); next();}, upload.single('avatar'), updateUserAvatar);

export default router;
