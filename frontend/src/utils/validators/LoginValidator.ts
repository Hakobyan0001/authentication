import { validateEmail, validatePassword } from './validatorUtils';

type LoginFormTypes = {
  password: string;
  email: string;
};
type ValidationErrorType = {
  emailError: string;
  passwordError: string;
};

function LoginValidator(formData: LoginFormTypes): ValidationErrorType {
  const passwordError = validatePassword(formData.password);
  const emailError = validateEmail(formData.email);

  return { passwordError, emailError };
}

export default LoginValidator;
