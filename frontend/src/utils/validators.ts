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

export function validateFullName(fullName: string): string {
  if (!fullName) return 'Full name is required';
  return '';
}
