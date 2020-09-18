import { IValidationError, IAjaxError } from "../../services/api";
import { createAction } from "@reduxjs/toolkit";

/**
 * Global error information.
 */
export interface IErrorState {
  error?: IValidationError | IAjaxError | string;
  message?: string;
}

/**
 * Error action names.
 */
export enum ErrorAction {
  set = "set-error",
  clear = "clear-error",
}

/**
 * Update the store with the specified 'error'.
 * @param error The error to add to the store.
 */
export const setError = createAction(
  ErrorAction.set,
  (error: IValidationError | IAjaxError | string) => ({ payload: error })
);

/**
 * Clear the current error from the store.
 */
export const clearError = createAction(ErrorAction.clear);
