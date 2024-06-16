import { PrismaClient } from '@prisma/client';
import { isValidEmail } from '../utils/validators';

const prisma = new PrismaClient();

class UsersService {
  async findUser(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        password
      }
    });

    return user;
  }
  async isInvalidEmail(email: string) {
    if (!isValidEmail(email)) {
      return { message: 'Invalid email', error: true };
    }
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return { message: 'Email already taken', error: true };
    }
    return false;
  }
}

export default UsersService;
