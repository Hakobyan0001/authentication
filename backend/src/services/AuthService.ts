import { PrismaClient } from '@prisma/client';

import { isValidEmail } from '../utils/validators';

const prisma = new PrismaClient();

class AuthService {
  async findUser(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    return user;
  }
  async findUserById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    });

    return user;
  }
  async isInvalidEmail(email: string) {
    if (!isValidEmail(email)) {
      return { message: 'Invalid email' };
    }
    const existingUser = await prisma.user.findFirst({
      where: { email }
    });
    if (existingUser) {
      return { message: 'Email already taken' };
    }
    return false;
  }
  async changePassword(userId: string, password: string): Promise<Boolean> {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password }
    });
    await prisma.passwordResetToken.deleteMany({
      where: { userId }
    });
    return updatedUser ? true : false;
  }
  catch(error: string) {
    console.error('Change Password error:', error);
    return false;
  }
}

export default AuthService;
