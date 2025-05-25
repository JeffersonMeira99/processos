import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.services";
import { BadRequestError } from "../errors/BadRequestError";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email e senha obrigatórios");
    }

    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email e senha obrigatórios");
    }

    const tokens = await authService.register(name, email, password);
    res.status(201).json(tokens);
  } catch (error) {
    next(error);
  }
};
