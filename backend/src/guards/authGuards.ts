import { authenticate } from 'passport';

const loginToPassport = authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

export default loginToPassport;
