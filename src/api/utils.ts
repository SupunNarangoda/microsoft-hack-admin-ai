import { AxiosError } from "axios";

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AxiosError | Error };

export async function fetchRequest<T>(
  func: () => Promise<T>,
): Promise<Result<T>> {
  try {
    const data: T = await func();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error as AxiosError | Error,
    };
  }
}
