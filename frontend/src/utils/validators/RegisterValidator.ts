type RegisterFormTypes = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
};

class RegisterValidator {
  static validate(formData: RegisterFormTypes) {
    const fullNameError = this.validateFullName(formData.fullName);
    const passwordError = this.validatePassword(formData.password);
    const confirmPasswordError = this.validateConfirmPassword({
      password: formData.password,
      confirmPassword: formData.confirmPassword
    });
    const emailError = this.validateEmail(formData.email);

    return { fullNameError, passwordError, confirmPasswordError, emailError };
  }

  static validateEmail(email: string): string {
    if (!email) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email address';
    return '';
  }

  static validatePassword(password: string): string {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters long';
    return '';
  }

  static validateConfirmPassword({
    password,
    confirmPassword
  }: {
    password: string;
    confirmPassword: string;
  }): string {
    if (!confirmPassword) return 'Confirm password is required';
    if (confirmPassword.length < 6) return 'Confirm password must be at least 6 characters long';
    if (confirmPassword !== password)
      return 'Passwords do not match. Please ensure that both password fields are identical';
    return '';
  }

  static validateFullName(fullName: string): string {
    if (!fullName) return 'Full name is required';
    const words = fullName.trim().split(/\s+/);
    if (words.length < 2) return 'Full name must contain at least a first name and a last name';
    return '';
  }
}

export default RegisterValidator;
