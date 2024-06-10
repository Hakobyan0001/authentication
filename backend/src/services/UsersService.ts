import { PrismaClient } from '@prisma/client';
import { isValidEmail } from '../utils/validators';

const prisma = new PrismaClient();

class UsersService {
  async getList({ reqQuery, paginationParams }) {
    const where = {
      active: true,
      OR: [
        { full_name: { contains: reqQuery.search || '' } },
        { role: { equals: reqQuery.role || '' } },
        { email: { contains: reqQuery.search || '' } }
      ]
    };
    const users = await prisma.user.findMany({
      where,
      ...paginationParams
    });
    return users;
  }

  async create(data) {
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

  async isInvalidEmail(email) {
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
