import { validateEmail, validatePassword } from './validatorUtils';

interface LoginFormTypes {
  password: string;
  email: string;
}
interface ValidationErrorType {
  emailError: string;
  passwordError: string;
}

function LoginValidator(formData: LoginFormTypes): ValidationErrorType {
  const passwordError = validatePassword(formData.password);
  const emailError = validateEmail(formData.email);

  return { passwordError, emailError };
}

export default LoginValidator;
