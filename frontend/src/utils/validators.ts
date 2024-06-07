export function validateEmail(email: string): string | null {
  if (!email) return "Email address is required";
  if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  // Add additional password validation rules if needed
  return null;
}

export function validateName(
  firstName: string,
  lastName: string
): { firstName?: string; lastName?: string } {
  const errors: { firstName?: string; lastName?: string } = {};

  if (!firstName) errors.firstName = "First name is required";
  if (!lastName) errors.lastName = "Last name is required";

  return errors;
}
