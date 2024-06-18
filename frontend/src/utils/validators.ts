export function validateEmail(email: string): string | null {
  if (!email) return 'Email address is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email address';
  return '';
}

export function validatePassword(password: string) {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return '';
}

export function validateConfirmPassword(password: string, confirmPassword: string) {
  if (!confirmPassword) return 'Confirm password is required';
  if (confirmPassword.length < 6) return 'confirm Password must be at least 6 characters';
  if (confirmPassword === password) return '';
  return 'Password and Confirm Password must be same';
}

export function validateFullName(fullName: string): string {
  if (!fullName) return 'Full name is required';
  return '';
}
