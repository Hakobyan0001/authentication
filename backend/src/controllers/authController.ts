import { Request, Response } from 'express';
import setStatus from '../utils/setStatus';
import UsersService from '../services/UsersService';
import mapper from '../mappers/user';
import generateToken from '../utils/generateToken';
import statusCodes from '../config/statusCodes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UsersService();

/**
 * Login controller
 * @param req Request object
 * @param res Response object
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = mapper.toDTO(req.user);
    const token = generateToken(user);
    res.json({ token, user });
  } catch (error) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
    });
  }
};

/**
 * Register controller
 * @param req Request object
 * @param res Response object
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullName, role } = req.body;

    if (!role || !['customer', 'specialist'].includes(role)) {
      return setStatus(res, true, {
        status: statusCodes.BadRequestError,
        message: 'Bad Request. User role should be either customer or specialist.'
      });
    }

    if (!fullName || !email || !password || password.length < 6) {
      return setStatus(res, true, {
        status: statusCodes.BadRequestError,
        message: 'Bad Request. Please provide valid values for all fields.'
      });
    }

    const validationError = await userService.isInvalidEmail(email);
    if (validationError) {
      return setStatus(res, true, {
        status: 400,
        success: true,
        message: validationError.message
      });
    }
    const newUser = await prisma.user.create({
      data: {
        full_name: fullName,
        email,
        password,
        role
      }
    });

    const token = generateToken(newUser);

    setStatus(res, false, {
      success: true,
      token,
      user: mapper.toDTO(newUser),
      message: 'Your account has been created. Please login.'
    });
  } catch (error) {
    setStatus(res, true, {
      status: statusCodes.ServerError,
      message: 'Server error'
    });
  }
};
