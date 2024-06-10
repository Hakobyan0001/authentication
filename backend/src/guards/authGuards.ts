import { authenticate } from 'passport';

const loginToPassport = authenticate('local', { session: false });
const requireAuth = authenticate('jwt', { session: false });

export default {
  loginToPassport,
  requireAuth
};
