import { JwtPayload } from "./auth/jwt-payload.type";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
