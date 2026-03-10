export const errorMessages = {
  smtpEnvMissing: 'SMTP configuration is missing in environment variables',
  jwtSecretMissing: 'JWT_SECRET is not defined in environment variables',
  notFound: (resource: string) => `${resource} not found.`,
  creationError: (resource: string) => `An error occurred while creating the ${resource}.`,
  retrievalError: (resource: string) => `An error occurred while retrieving ${resource}.`,
  updateError: (resource: string) => `An error occurred while updating the ${resource}.`,
  deleteError: (resource: string) => `An error occurred while deleting the ${resource}.`,
  emailExists: 'A user with this email already exists.',
  passwordRequired: 'Password is required for registration.',
  invalidCredentials: 'Invalid email or password.',
  unauthorized: 'Unauthorized. A valid token is required.',
  invalidToken: 'Invalid or expired token.',
};

export const formatResponse = (success: boolean, message: string, data?: any) => {
  return {
    success,
    message,
    data: data || null,
  };
};

export const successMessages = {
  retrieved: (resource: string) => `${resource} retrieved successfully.`,
  created: (resource: string) => `${resource} created successfully.`,
  updated: (resource: string) => `${resource} updated successfully.`,
  deleted: (resource: string) => `${resource} deleted successfully.`,
  loginSuccess: 'User logged in successfully.',
};
