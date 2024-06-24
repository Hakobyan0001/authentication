import { validateNewPassword } from './validatorUtils';

type SetFormType = {
  newPassword: string;
  confirmNewPassword: string;
};
type ValidationErrorType = {
  newPasswordError: string;
  confirmNewPasswordError: string;
};

function SetValidator(formData: SetFormType): ValidationErrorType {
  const { newPasswordError, confirmNewPasswordError } = validateNewPassword(
    formData.newPassword,
    formData.confirmNewPassword
  );
  return { newPasswordError, confirmNewPasswordError };
}

export default SetValidator;
