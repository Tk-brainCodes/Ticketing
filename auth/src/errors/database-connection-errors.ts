import { CustomError } from "./customErrors";

export class DatabaseValidationError extends CustomError {
  reason = "Error connecting to database";
  statusCode = 500;
  constructor() {
    super("unable to connect to database");

    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.reason }];
  }
}
