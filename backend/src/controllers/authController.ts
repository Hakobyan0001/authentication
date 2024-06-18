import { Request, Response } from 'express';
import setStatus from '../utils/setStatus';
import UsersService from '../services/UsersService';
import { toDTO } from '../mappers/user';
import statusCodes from '../config/statusCodes';
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/generateToken';
import auth from '../config/auth';

const prisma = new PrismaClient();
const userService = new UsersService();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUser(email, password);

    if (!user) {
      setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'User not found or password incorrect'
      });
      return;
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
  const { email, password, fullName } = req.body;

  if (!fullName || !email || !password || password.length < 6) {
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
    await prisma.user.create({
      data: {
        full_name: fullName,
        email,
        password
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
  try {
    const { email } = req.body;

    const user = await userService.findUser(email);

    if (!user) {
      setStatus(res, true, {
        status: statusCodes.NotFoundStatus,
        message: 'User not found'
      });
      return;
    }
    const token = generateToken({ id: user.id });
    const expiresAt = new Date(Date.now() + parseInt(auth.tokenExpiration) * 1000);

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
  try {
    const { token, password } = req.body;

    // Find the password reset token in the database
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: token,
        expiresAt: {
          gte: new Date() // Check if token is not expired
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
