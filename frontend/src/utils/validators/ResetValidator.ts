import { validateEmail } from './validatorUtils';

interface ResetFormType {
  email: string;
}
interface ValidationErrorType {
  emailError: string;
}
function ResetValidator(formData: ResetFormType): ValidationErrorType {
  const emailError = validateEmail(formData.email);
  return { emailError };
}

export default ResetValidator;
