import * as bcrypt from "bcrypt";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "./user.entity";
import { AppDataSource } from "../database/database";

const userRepository = AppDataSource.getRepository(User);

export const usersServices = {
  createUser: async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return userRepository.save(user);
  },

  findByEmail: async (email: string): Promise<User | null> => {
    return userRepository.findOne({ where: { email } });
  },

  findById: async (id: number): Promise<User> => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundError(`Usuário com id ${id} não encontrado`);
    return user;
  },

  findAll: async (): Promise<User[]> => {
    return userRepository.find();
  },

  update: async (id: number, updateData: Partial<User>): Promise<User> => {
    const user = await usersServices.findById(id);
    Object.assign(user, updateData);
    return userRepository.save(user);
  },
};
