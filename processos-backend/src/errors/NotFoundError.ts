
import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(message = "Recurso não encontrado") {
    super(404, message, "NotFoundError");
  }
}
