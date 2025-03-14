import express from "express";
import CourseController from "../controllers/courses";

const router = express.Router();

router.get("/courses", CourseController.getAllCourses);
router.get("/courses/:id", CourseController.getCourseById);
router.post("/courses", CourseController.createCourse);
router.put("/courses/:id", CourseController.updateCourse);
router.delete("/courses/:id", CourseController.deleteCourse);

export { router as coursesRouter };
