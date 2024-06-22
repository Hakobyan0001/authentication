type LoginFormTypes = {
  password: string;
  email: string;
};

class LoginValidator {
  static validate(formData: LoginFormTypes) {
    const passwordError = this.validatePassword(formData.password);
    const emailError = this.validateEmail(formData.email);

    return { passwordError, emailError };
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
}

export default LoginValidator;
