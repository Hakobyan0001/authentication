import { Request, Response } from 'express';
import setStatus from '../utils/setStatus';
import AuthService from '../services/AuthService';
import { toDTO } from '../mappers/user';
import { statusCodes, severities } from '../config';
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/generateToken';
import bcryptHelper from '../utils/bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();
const authService = new AuthService();
const { hashPassword, comparePassword } = bcryptHelper();

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const user = await authService.findUser(email);

    if (!user) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'Invalid email or password',
        severity: severities.error
      });
    }
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'Invalid email or password',
        severity: severities.error
      });
    }
    const userDTO = toDTO(user);
    const token = generateToken(userDTO);

    res.json({ token, severity: severities.success, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error',
      severity: severities.error
    });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  const { email, newPassword: password, fullName } = req.body;

  if (!fullName || !email || !password || password.length < 6) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: 'Bad Request. Please provide valid values for all fields.',
      severity: severities.error
    });
  }
  try {
    const emailValidationError = await authService.isInvalidEmail(email);
    if (emailValidationError) {
      return setStatus(res, true, {
        status: statusCodes.BadRequestError,
        message: emailValidationError.message,
        severity: severities.error
      });
    }
    const hashedPassword = hashPassword({ password });

    await prisma.user.create({
      data: {
        fullName: fullName,
        email,
        password: hashedPassword
      }
    });
    setStatus(res, false, {
      status: statusCodes.Created,
      message: 'Your account has been created. Please login',
      severity: severities.success
    });
  } catch (error) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error',
      severity: severities.error
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const user = await authService.findUser(email);

    if (!user) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'User not found',
        severity: severities.error
      });
    }
    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt
      }
    });

    res.json({ token, severity: severities.info, message: 'Password reset token generated' });
  } catch (error) {
    console.error('reset Password error:', error);
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error',
      severity: severities.error
    });
  }
}

export async function setPassword(req: Request, res: Response) {
  const { token, password } = req.body;
  try {
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: token,
        expiresAt: {
          gte: new Date()
        }
      },
      include: {
        user: true
      }
    });

    if (!resetToken) {
      setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'Invalid or expired token',
        severity: severities.error
      });
      return;
    }
    const hashedPassword = hashPassword({ password });

    const isChanged = await authService.changePassword(resetToken.userId, hashedPassword);

    if (!isChanged) {
      setStatus(res, true, {
        status: statusCodes.ServerError,
        message: 'Failed to update password',
        severity: severities.error
      });
      return;
    }

    res.json({ severity: severities.success, message: 'Password updated successfully' });
  } catch (error) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error',
      severity: severities.error
    });
  }
}
