export function validateEmail(email: string): string | null {
  if (!email) return 'Email address is required';
  if (!/\S+@\S+\.\S+/.test(email)) return 'Invalid email address';
  return '';
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  // Add additional password validation rules if needed
  return '';
}

export function validateFullName(fullName: string): string {
  if (!fullName) return 'Full name is required';
  // Additional validation logic if needed
  return '';
}
