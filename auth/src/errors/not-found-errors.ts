import { CustomError } from "./customErrors";

export class NotFoundError extends CustomError {
  statusCode = 400;

  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not found" }];
  }
}

