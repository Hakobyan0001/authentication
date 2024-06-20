type EmailType = string;
type PasswordTypes = {
  password: string;
  isNewPassword: boolean;
};
type FullNameType = string;
type ConfirmPasswordTypes = {
  password: string;
  confirmPassword: string;
};
export function validateEmail(email: EmailType): string | null {
  if (!email) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address';
  return null;
}

export function validatePassword({ password, isNewPassword }: PasswordTypes): string | null {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  if (isNewPassword) {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password))
      return 'Password must include at least one symbol, one lowercase letter, one uppercase letter, and one number';
  }

  return null;
}

export function validateConfirmPassword({
  password,
  confirmPassword
}: ConfirmPasswordTypes): string | null {
  if (!confirmPassword) return 'Confirm password is required';
  if (confirmPassword.length < 6) return 'Confirm password must be at least 6 characters long';
  if (confirmPassword !== password)
    return 'Passwords do not match. Please ensure that both password fields are identical';
  return null;
}

export function validateFullName(fullName: FullNameType): string | null {
  if (!fullName) return 'Full name is required';
  const words = fullName.trim().split(/\s+/);
  if (words.length < 2) return 'Full name must contain at least a first name and a last name';
  return null;
}
