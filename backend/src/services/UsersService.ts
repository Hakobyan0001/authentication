import { PrismaClient } from '@prisma/client';
import { isValidEmail } from '../utils/validators';

const prisma = new PrismaClient();

class UsersService {
  async create(data: { email: string; full_name: string; password: string }) {
    const { email } = data;
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    if (existingUser) {
      throw new Error('User with such email already exists.');
    }
    const newUser = await prisma.user.create({
      data: {
        ...data,
        email: email.toLowerCase()
      }
    });
    return newUser;
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
