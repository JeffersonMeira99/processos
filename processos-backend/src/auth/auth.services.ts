import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersServices } from "../users/users.services";
import { NotFoundError } from "../errors/NotFoundError";

interface Tokens {
  access_token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<Tokens> => {
    const user = await usersServices.findByEmail(email);
    if (!user) throw new NotFoundError("Usuário não encontrado");

    const passwordMatches = await bcrypt.compare(password, user.password!);
    if (!passwordMatches) throw new Error("Senha incorreta");

    const tokens = await authService.getTokens(user.id, user.name, user.email);

    await usersServices.update(user.id, {});

    return tokens;
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<Tokens> => {
    const user = await usersServices.createUser(name, email, password);

    const tokens = await authService.getTokens(user.id, user.name, user.email);

    await usersServices.update(user.id, {});

    return tokens;
  },

  getTokens: async (
    userId: number,
    name: string,
    email: string
  ): Promise<Tokens> => {
    const accessToken = jwt.sign(
      { sub: userId, name, email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" }
    );

    return { access_token: accessToken };
  },
};
