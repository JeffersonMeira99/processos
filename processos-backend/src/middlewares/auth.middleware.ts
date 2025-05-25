import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Rotas públicas
const publicRoutes = [{ method: "POST", path: "/register" }];

// Função para verificar se a rota é pública
function isPublicRoute(req: Request) {
  return publicRoutes.some(
    (route) => route.method === req.method && route.path === req.path
  );
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isPublicRoute(req)) {
    return next();
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "defaultSecret";
    const decoded = jwt.verify(token, secret) as { sub: string; email: string };

    // Salvando o payload do token na request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Access Denied. Invalid token." });
  }
};
