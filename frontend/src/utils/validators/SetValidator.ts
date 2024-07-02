import { validateNewPassword } from './validatorUtils';

interface SetFormType {
  newPassword: string;
  confirmNewPassword: string;
}
interface ValidationErrorType {
  newPasswordError: string;
  confirmNewPasswordError: string;
}

function SetValidator(formData: SetFormType): ValidationErrorType {
  const { newPasswordError, confirmNewPasswordError } = validateNewPassword(
    formData.newPassword,
    formData.confirmNewPassword
  );
  return { newPasswordError, confirmNewPasswordError };
}

export default SetValidator;
