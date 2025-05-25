import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../users/user.entity";
import { Process } from "../processos/processo.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3307,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [User, Process],
  synchronize: true,
});
