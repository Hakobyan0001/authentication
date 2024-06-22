type ResetFormType = {
  email: string;
};

class ResetValidator {
  static validate(formData: ResetFormType) {
    const emailError = this.validateEmail(formData.email);

    return { emailError };
  }

  static validateEmail(email: string): string {
    if (!email) return 'Email address is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email address';
    return '';
  }
}

export default ResetValidator;
