import { setError, clearError, IErrorState } from "../actions";
import { IValidationError, IAjaxError } from "../../services";
import { createReducer } from "@reduxjs/toolkit";

export const initialState: IErrorState = {
  error: undefined,
  message: undefined,
};

/**
 * Extract the error message from the error.
 * @param error Error object
 */
const extractError = (
  error?: IValidationError | IAjaxError | string
): string => {
  if (error instanceof String) return error as string;
  else if ((error as IValidationError).errors) {
    const validationError = error as IValidationError;
    const keys = Object.keys(validationError.errors);
    const messages = keys
      .map((k) => `${k}:${validationError.errors[k]}`)
      .join(", ");
    return `${validationError.title} ${messages}`;
  } else if ((error as IAjaxError).error) {
    const ajaxError = error as IAjaxError;
    return ajaxError.error as string;
  }
  return error as string;
};

export const errorReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setError, (state, action) => ({
      ...state,
      error: action.payload,
      message: extractError(action.payload),
    }))
    .addCase(clearError, (state) => ({
      ...state,
      error: undefined,
      message: undefined,
    }))
);
