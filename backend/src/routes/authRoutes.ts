import { Router } from 'express';
import { register, login } from '../controllers/authController';
import passportService from '../config/passport';
import { authGuards } from '../guards';

const router = Router();

router.post('/register', register);
router.post('/login', authGuards.loginToPassport, login);

export default router;
