import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

export type JwtPayload = {
  sub: string;
  email: string;
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

// Define a estratégia JWT
passport.use(
  new JwtStrategy(options, (payload: JwtPayload, done) => {
    try {
      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Middleware para proteger rotas com JWT
export const authenticateJwt = passport.authenticate("jwt", { session: false });
