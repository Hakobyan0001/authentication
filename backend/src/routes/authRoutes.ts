import { Router } from 'express';
import { register, login, resetPassword, setPassword } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/resetPassword', resetPassword);
router.patch('/setPassword', setPassword);
export default router;
