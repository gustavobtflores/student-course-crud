import { Request, Response } from "express";
import Course from "../models/Course";

class CourseController {
  public async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({ message: "Curso não encontrado" });
        return;
      }
      res.json(course);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  public async createCourse(req: Request, res: Response): Promise<void> {
    const { name, code, description } = req.body;
    const course = new Course({ name, code, description });
    try {
      const newCourse = await course.save();
      res.status(201).json(newCourse);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({ message: "Curso não encontrado" });
        return;
      }
      if (req.body.name !== undefined) course.name = req.body.name;
      if (req.body.code !== undefined) course.id = req.body.code;
      if (req.body.description !== undefined) course.description = req.body.description;

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        res.status(404).json({ message: "Curso não encontrado" });
        return;
      }
      await course.deleteOne();
      res.json({ message: "Curso removido com sucesso" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CourseController();
