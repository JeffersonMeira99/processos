import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";

export enum ProcessStatus {
  EM_ANDAMENTO = "em_andamento",
  ACORDO_REALIZADO = "acordo_realizado",
  EMCERRADO = "encerrado",
}
@Entity()
export class Process {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  claimant: string;

  @Column()
  defendant: string;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: ProcessStatus,
  })
  status: ProcessStatus;

  @ManyToOne(() => User, (user) => user.processes)
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  opening_date: Date;
}
