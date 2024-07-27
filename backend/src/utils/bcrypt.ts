import { compareSync, genSaltSync, hashSync } from 'bcrypt';

type User = {
  password: string;
};

export default function bcryptHelper() {
  function hashPassword(user: User): string {
    const salt = genSaltSync(10);
    return hashSync(user.password, salt);
  }

  function comparePassword(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  return {
    hashPassword,
    comparePassword
  };
}
