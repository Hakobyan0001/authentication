import cron from 'node-cron';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteExpiredTokens() {
  try {
    const result = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    });
    console.log(`Deleted ${result.count} expired tokens.`);
  } catch (error) {
    console.error('Error deleting expired tokens:', error);
  }
}

cron.schedule('0 * * * *', deleteExpiredTokens);

deleteExpiredTokens();
