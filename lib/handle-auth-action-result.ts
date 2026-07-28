import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import type { AuthActionResult } from "@/lib/auth-action-result";

export function applyAuthActionResult<T extends FieldValues>(
  result: AuthActionResult,
  form: UseFormReturn<T>,
  setFormError: (message: string | null) => void,
  fields: Path<T>[],
): result is { success: true } {
  if (result.success) {
    return true;
  }

  for (const err of result.errors) {
    const field = String(err.field);
    if (fields.includes(field as Path<T>)) {
      form.setError(field as Path<T>, { message: err.message });
    } else {
      setFormError(err.message);
    }
  }

  return false;
}
