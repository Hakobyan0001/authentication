interface ValidateNewPasswordResult {
  newPasswordError: string;
  confirmNewPasswordError: string;
}

export function validateEmail(email: string): string {
  if (!email) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email address';
  return '';
}

export function validatePassword(password: string): string {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters long';
  return '';
}

export function validateNewPassword(
  password: string,
  confirmPassword: string
): ValidateNewPasswordResult {
  let newPasswordError = validatePassword(password);
  let confirmNewPasswordError = validatePassword(confirmPassword);

  if (!newPasswordError) {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      newPasswordError =
        'Password must include at least one symbol, one lowercase letter, one uppercase letter, and one number';
    }
  }

  if (!confirmNewPasswordError && confirmPassword !== password) {
    confirmNewPasswordError =
      'Passwords do not match. Please ensure that both password fields are identical';
  }

  return { newPasswordError, confirmNewPasswordError };
}

export function validateFullName(fullName: string): string {
  if (!fullName) return 'Full name is required';
  const words = fullName.trim().split(/\s+/);
  if (words.length < 2) return 'Full name must contain at least a first name and a last name';
  return '';
}
