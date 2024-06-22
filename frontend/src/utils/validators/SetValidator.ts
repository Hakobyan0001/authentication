type SetFormType = {
  newPassword: string;
  newConfirmPassword: string;
};

class SetValidator {
  static validate(formData: SetFormType) {
    const NewPasswordError = this.validatePassword(formData.newPassword);
    const confirmNewPasswordError = this.validateConfirmPassword({
      newPassword: formData.newPassword,
      newConfirmPassword: formData.newConfirmPassword
    });
    return { NewPasswordError, confirmNewPasswordError };
  }

  static validatePassword(newPassword: string): string {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!newPassword) return 'Password is required';
    if (newPassword.length < 6) return 'Password must be at least 6 characters long';
    if (!passwordRegex.test(newPassword))
      return 'Password must include at least one symbol, one lowercase letter, one uppercase letter, and one number';

    return '';
  }

  static validateConfirmPassword({
    newPassword,
    newConfirmPassword
  }: {
    newPassword: string;
    newConfirmPassword: string;
  }): string {
    if (!newConfirmPassword) return 'Confirm password is required';
    if (newConfirmPassword.length < 6) return 'Confirm password must be at least 6 characters long';
    if (newConfirmPassword !== newPassword)
      return 'Passwords do not match. Please ensure that both password fields are identical';
    return '';
  }
}

export default SetValidator;
