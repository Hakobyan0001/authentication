import { PrismaClient } from '@prisma/client';
import { isValidEmail } from '../utils/validators';

const prisma = new PrismaClient();

interface ServiceError {
  message: string;
  code?: string;
}

class AuthService {
  async findUser(email: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email
        }
      });
      return user;
    } catch (error) {
      console.error('Error in findUser:', error);
      throw { message: 'Database error in findUser', code: 'DB_ERROR_FIND_USER' } as ServiceError;
    }
  }

  async isInvalidEmail(email: string) {
    try {
      if (!isValidEmail(email)) {
        return { message: 'Invalid email' };
      }
      const existingUser = await prisma.user.findFirst({
        where: { email }
      });
      if (existingUser) {
        return { message: 'Email already taken' };
      }
      return;
    } catch (error) {
      console.error('Error in isInvalidEmail:', error);
      throw { message: 'Database error in isInvalidEmail', code: 'DB_ERROR_INVALID_EMAIL' } as ServiceError;
    }
  }

  async changePassword(userId: string, password: string): Promise<boolean> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password }
      });
      await prisma.passwordResetToken.deleteMany({
        where: { userId }
      });
      return updatedUser ? true : false;
    } catch (error) {
      console.error('Error in changePassword:', error);
      throw { message: 'Database error in changePassword', code: 'DB_ERROR_CHANGE_PASSWORD' } as ServiceError;
    }
  }
}

export default AuthService;
