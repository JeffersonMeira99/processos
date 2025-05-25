import { Request, Response } from "express";

import { processService } from "./processo.services";
import { ProcessStatus } from "./processo.entity";
import { CreateProcessDto } from "./dto/create-process.dto";
import { UpdateProcessDto } from "./dto/update-process.dto";

export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const status = req.query.status as ProcessStatus | undefined;
    const processes = await processService.findAll(status);
    res.json(processes);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Error listing processes" });
  }
};

export const findById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const process = await processService.findById(id);
    if (!process) {
      res.status(404).json({ message: "Process not found" });
      return;
    }

    res.json(process);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Error finding process" });
  }
};

export const createProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = req.user as { sub: string } | undefined;

    if (!user?.sub) {
      res.status(401).json({ message: "Usuário não autenticado" });
      return;
    }
    const createProcessDto: CreateProcessDto = req.body;
    const process = await processService.create(
      createProcessDto,
      Number(user.sub)
    );

    res.status(201).json(process);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const updateProcessDto: UpdateProcessDto = req.body;
    const updatedProcess = await processService.update(id, updateProcessDto);

    if (!updatedProcess) {
      res.status(404).json({ message: "Process not found" });
      return;
    }

    res.json(updatedProcess);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Error updating process" });
  }
};

export const deleteProcess = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const deleted = await processService.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "Process not found" });
      return;
    }

    res.status(204).send();
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || "Error deleting process" });
  }
};
