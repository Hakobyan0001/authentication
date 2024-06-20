import { Request, Response } from 'express';
import setStatus from '../utils/setStatus';
import UsersService from '../services/UsersService';
import { toDTO } from '../mappers/user';
import statusCodes from '../config/statusCodes';
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/generateToken';
import auth from '../config/auth';
import bcryptHelper from '../utils/bcrypt';
import crypto from 'crypto';

const prisma = new PrismaClient();
const userService = new UsersService();
const { hashPassword, comparePassword } = bcryptHelper();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await userService.findUser(email);

    if (!user) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'Invalid email or password'
      });
    }
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user);
    const userDTO = toDTO(user);

    res.json({ token, ...userDTO });
  } catch (error) {
    console.error('Login error:', error);
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
    });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, full_name } = req.body;

  if (!full_name || !email || !password || password.length < 6) {
    return setStatus(res, true, {
      status: statusCodes.BadRequestError,
      message: 'Bad Request. Please provide valid values for all fields.'
    });
  }
  try {
    const validationError = await userService.isInvalidEmail(email);
    if (validationError) {
      return setStatus(res, true, {
        status: statusCodes.BadRequestError,
        message: validationError.message
      });
    }
    const hashedPassword = hashPassword({ password });

    await prisma.user.create({
      data: {
        full_name: full_name,
        email,
        password: hashedPassword
      }
    });
    setStatus(res, false, {
      status: statusCodes.Created,
      message: 'Your account has been created. Please login.'
    });
  } catch (error) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
    });
  }
};

export async function resetPassword(req: Request, res: Response) {
  const { email } = req.body;
  try {
    const user = await userService.findUser(email);

    if (!user) {
      return setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'User not found'
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

    res.json({ token });
  } catch (error) {
    console.error('reset Password error:', error);
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
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
        message: 'Invalid or expired token'
      });
      return;
    }

    // Update the user's password
    const isChanged = await userService.changePassword(resetToken.userId, password);
    if (!isChanged) {
      setStatus(res, true, {
        status: statusCodes.ServerError,
        message: 'Failed to update password'
      });
      return;
    }

    res.json(true);
  } catch (error) {
    console.error('Set Password error:', error);
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
    });
  }
}
