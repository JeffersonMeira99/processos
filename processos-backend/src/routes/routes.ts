import { Router } from "express";
import * as usersController from "../users/users.controller";
import * as authController from "../auth/auth.controller";
import * as processoController from "../processos/processo.controller";
import { authenticateJwt } from "../strategies/at.strategies";

const router = Router();

// Rotas de autenticação
router.post("/login", authController.login);
router.post("/register", authController.register);

// Rotas de usuários
router.get("/users", authenticateJwt, usersController.findAll);
router.get("/users/:id", authenticateJwt, usersController.findById);

// Rotas de processos
router.get("/processos", authenticateJwt, processoController.findAll);
router.post("/processos", authenticateJwt, processoController.createProcess);
router.get("/processos/:id", authenticateJwt, processoController.findById);
router.put("/processos/:id", authenticateJwt, processoController.updateProcess);
router.delete(
  "/processos/:id",
  authenticateJwt,
  processoController.deleteProcess
);

export default router;
