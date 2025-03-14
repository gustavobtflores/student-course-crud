import { Request, Response } from "express";
import { Types } from "mongoose";
import Student from "../models/Student";

export class StudentEnrollmentController {
  public async getStudentEnrollments(req: Request, res: Response): Promise<void> {
    try {
      const student = await Student.findById(req.params.id).populate("courses");

      if (!student) {
        res.status(404).json({ message: "Estudante não encontrado" });
        return;
      }

      res.json(student.courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async enrollCourse(req: Request, res: Response): Promise<void> {
    try {
      const studentId = req.params.id;
      const { courseId } = req.body;

      if (!studentId || !courseId) {
        res.status(400).json({ message: "Dados insuficientes para a matrícula." });
        return;
      }

      if (!Types.ObjectId.isValid(studentId) || !Types.ObjectId.isValid(courseId)) {
        res.status(400).json({ message: "IDs inválidos." });
        return;
      }

      const student = await Student.findById(studentId);
      if (!student) {
        res.status(404).json({ message: "Aluno não encontrado." });
        return;
      }

      if (student.courses.includes(courseId)) {
        res.status(400).json({ message: "Aluno já matriculado neste curso." });
        return;
      }

      student.courses.push(courseId);
      await student.save();

      res.status(200).json({
        message: "Aluno matriculado com sucesso.",
        student,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async unenrollCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id: studentId, courseId } = req.params;

      if (!studentId || !courseId) {
        res.status(400).json({ message: "Dados insuficientes para a desmatrícula." });
        return;
      }

      if (!Types.ObjectId.isValid(studentId) || !Types.ObjectId.isValid(courseId)) {
        res.status(400).json({ message: "IDs inválidos." });
        return;
      }

      const student = await Student.findById(studentId);
      if (!student) {
        res.status(404).json({ message: "Aluno não encontrado." });
        return;
      }

      const courseIndex = student.courses.findIndex((c: Types.ObjectId) => c.toString() === courseId);

      if (courseIndex === -1) {
        res.status(400).json({ message: "Aluno não está matriculado neste curso." });
        return;
      }

      student.courses.splice(courseIndex, 1);
      await student.save();

      res.status(200).json({
        message: "Aluno desmatriculado com sucesso.",
        student,
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new StudentEnrollmentController();
