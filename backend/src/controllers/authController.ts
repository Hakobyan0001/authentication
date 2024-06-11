import { Request, Response } from 'express';
import setStatus from '../utils/setStatus';
import UsersService from '../services/UsersService';
import { toDTO } from '../mappers/user';
import statusCodes from '../config/statusCodes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UsersService();

type User = {
  id: string;
  full_name: string;
  email: string;
  password: string;
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user as User;

    if (!user || !user.id || !user.full_name || !user.email || !user.password) {
      throw new Error('Invalid user object received from request');
    }
    const userDTO = toDTO(user);
    res.json({ userDTO });
  } catch (error) {
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
        status: 400,
        message: validationError.message
      });
    }
    const newUser = await prisma.user.create({
      data: {
        full_name: fullName,
        email,
        password
      }
    });

    setStatus(res, false, {
      status: 200,
      message: 'Your account has been created. Please login.'
    });
  } catch (error) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
    });
  }
};
