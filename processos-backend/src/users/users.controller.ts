import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { usersServices } from "./users.services";
import { CreateUserDto } from "./dto/create-user.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dto = plainToInstance(CreateUserDto, req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const messages = errors
        .map((e) => Object.values(e.constraints ?? {}))
        .flat();
      throw new BadRequestError(messages.join(", "));
    }
    const user = await usersServices.createUser(
      dto.name,
      dto.email,
      dto.password
    );
    const { password, ...result } = user;
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await usersServices.findAll();
    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
    res.json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new BadRequestError("ID inválido");
    const user = await usersServices.findById(id);
    if (!user) throw new NotFoundError("Usuário não encontrado");
    const { password, ...result } = user;
    res.json(result);
  } catch (error) {
    next(error);
  }
};
