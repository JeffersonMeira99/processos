
import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError {
  constructor(message = "Não autorizado") {
    super(401, message, "UnauthorizedError");
  }
}
