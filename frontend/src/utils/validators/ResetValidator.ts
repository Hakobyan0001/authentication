import { validateEmail } from './validatorUtils';

type ResetFormType = {
  email: string;
};
type ValidationErrorType = {
  emailError: string;
};
function ResetValidator(formData: ResetFormType): ValidationErrorType {
  const emailError = validateEmail(formData.email);
  return { emailError };
}

export default ResetValidator;
