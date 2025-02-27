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
  async login(req: Request, res: Response) {}
  async me(req: Request, res: Response) {}
}

export default new StudentController();
