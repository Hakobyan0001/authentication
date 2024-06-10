import { genSaltSync, hashSync, compareSync } from 'bcrypt-nodejs';

const bcryptHelper = () => {
  const password = (user: { password: any }) => {
    const salt = genSaltSync();
    return hashSync(user.password, salt); //hash
  };

  const comparePassword = (pw: any, hash: any) => compareSync(pw, hash);

  return {
    password,
    comparePassword
  };
};

export default bcryptHelper;
