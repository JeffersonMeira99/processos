
import { ApiError } from "./ApiError";

export class ForbiddenError extends ApiError {
  constructor(message = "Acesso negado") {
    super(403, message, "ForbiddenError");
  }
}
