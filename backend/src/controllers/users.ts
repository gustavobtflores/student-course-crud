import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const hash = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hash });
      await user.save();

      res.status(201).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Um erro inesperado aconteceu" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).send({ error: "Estudante não cadastrado" });
        return;
      }

      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        res.status(401).send({ error: "E-mail ou senha incorretos" });
        return;
      }

      const token = jwt.sign({ id: user._id, email: user.email }, "jwtsupersecret", { expiresIn: "1h" });

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

      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        res.status(404).send({ error: "Estudante não encontrado" });
        return;
      }

      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Um erro inesperado aconteceu" });
    }
  }
}

export default new UserController();
