import { genSaltSync, hashSync, compareSync } from 'bcrypt';

type User = {
  password: string;
};

export default function bcryptHelper() {
  async function hashPassword(user: User): Promise<string> {
    const salt = genSaltSync(10);
    return hashSync(user.password, salt);
  }

  async function comparePassword(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }

  return {
    hashPassword,
    comparePassword
  };
}
