import { Router } from 'express';
import { register, login, resetPassword, setPassword } from '../controllers/authController';
import loginToPassport from '../guards/authGuards';

const router = Router();

router.post('/register', register);
router.post('/login',loginToPassport, login);
router.post('/resetPassword', resetPassword);
router.patch('/setPassword', setPassword);
export default router;
