export type AuthActionError = {
  success: false;
  errors: { field: string | number; message: string }[];
};

export type AuthActionSuccess = {
  success: true;
};

export type AuthActionResult = AuthActionError | AuthActionSuccess;

export function authActionError(
  field: string | number,
  message: string,
): AuthActionError {
  return {
    success: false,
    errors: [{ field, message }],
  };
}
