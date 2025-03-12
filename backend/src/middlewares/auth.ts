import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Student from "../models/Student";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send({ error: "Token não fornecido" });
      return;
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded: any = jwt.verify(token, "jwtsupersecret");

    const student = await Student.findById(decoded.id);
    if (!student) {
      res.status(401).send({ error: "Usuário não encontrado" });
      return;
    }

    req.user = {
      id: student._id.toString(),
      email: student.email,
      name: student.name,
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ error: "Token inválido ou expirado" });
  }
};

export default authMiddleware;
