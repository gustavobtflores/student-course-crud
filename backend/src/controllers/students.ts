import { Request, Response, NextFunction } from "express";
import Student from "../models/Student";

class StudentController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const studentData = req.body;
      const student = await Student.create(studentData);
      res.status(201).json(student);
    } catch (error) {
      res.send(error);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.send(error);
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json(student);
    } catch (error) {
      res.send(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.send(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
      if (!deletedStudent) {
        res.status(404).json({ message: "Student not found" });
        return;
      }
      res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
      res.send(error);
    }
  }
}

export default new StudentController();
