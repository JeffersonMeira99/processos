import { Process, ProcessStatus } from "./processo.entity";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";
import { AppDataSource } from "../database/database";

const processRepository = AppDataSource.getRepository(Process);

export const processService = {
  findAll: async (status?: ProcessStatus): Promise<Process[]> => {
    const where: any = {};
    if (status) where.status = status;

    return processRepository.find({
      where,
    });
  },

  findById: async (id: number): Promise<Process | null> => {
    return processRepository.findOne({ where: { id } });
  },

  create: async (
    createProcessDto: CreateProcessDto,
    userId?: number
  ): Promise<Process> => {
    const processData = {
      ...createProcessDto,
      status: createProcessDto.status as ProcessStatus,
      opening_date: new Date(createProcessDto.opening_date),
      user: { id: userId },
    };

    const process = processRepository.create(processData);

    return processRepository.save(process);
  },

  update: async (
    id: number,
    updateProcessDto: UpdateProcessDto
  ): Promise<Process | null> => {
    const process = await processRepository.findOne({ where: { id } });
    if (!process) return null;
    Object.assign(process, updateProcessDto);
    return processRepository.save(process);
  },

  delete: async (id: number): Promise<boolean> => {
    const result = await processRepository.delete(id);
    return result.affected !== 0;
  },
};
