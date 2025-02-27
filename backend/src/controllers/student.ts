import { Request, Response } from "express";
import Student from "../models/Student";
import bcrypt from "bcrypt";

class StudentController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const hash = await bcrypt.hash(password, 10);
      const student = new Student({ name, email, password: hash });
      await student.save();

      res.status(201).send(student);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Algo inesperado aconteceu" });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      res.status(404).send({ error: "Estudante não cadastrado" });
      return;
    }

    const passwordMatches = await bcrypt.compare(password, student.password);

    if (passwordMatches) {
      res.status(200).send({ message: "Usuário autenticado" });
    } else {
      res.status(401).send({ error: "E-mail ou senha incorretos" });
    }
  }

  async me(req: Request, res: Response) {}
}

export default new StudentController();
