export class DatabaseValidationError extends Error {
  reason = "Error connecting to database";
  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }
}
