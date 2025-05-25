
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly name: string;

  constructor(statusCode: number, message: string, name = "ApiError") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}
