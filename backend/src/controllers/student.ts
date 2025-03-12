import { Request, Response } from "express";
import Student from "../models/Student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class StudentController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, birthdate } = req.body;

      const hash = await bcrypt.hash(password, 10);
      const student = new Student({ name, email, password: hash, birthdate });
      await student.save();

      res.status(201).send(student);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Um erro inesperado aconteceu" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const student = await Student.findOne({ email });
      if (!student) {
        res.status(404).send({ error: "Estudante não cadastrado" });
        return;
      }

      const passwordMatches = await bcrypt.compare(password, student.password);
      if (!passwordMatches) {
        res.status(401).send({ error: "E-mail ou senha incorretos" });
        return;
      }

      const token = jwt.sign({ id: student._id, email: student.email }, "jwtsupersecret", { expiresIn: "1h" });

      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Um erro inesperado aconteceu" });
    }
  }

  async me(req: Request, res: Response) {
    try {
      if (!req.user) {
        res.status(401).send({ error: "Usuário não autenticado" });
        return;
      }

      const student = await Student.findById(req.user.id).select("-password");
      if (!student) {
        res.status(404).send({ error: "Estudante não encontrado" });
        return;
      }

      res.status(200).send(student);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Um erro inesperado aconteceu" });
    }
  }
}

export default new StudentController();
