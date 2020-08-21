interface IError {
  error: string;
  type: string;
  details: string;
  stacktrace?: string;
}

export default IError;
