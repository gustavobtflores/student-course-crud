import { Router } from "express";
import StudentEnrollmentController from "../controllers/enrollments";

const router = Router();

router.get("/students/:id/courses", StudentEnrollmentController.getStudentEnrollments);
router.post("/students/:id/courses", StudentEnrollmentController.enrollCourse);
router.delete("/students/:id/courses/:courseId", StudentEnrollmentController.unenrollCourse);

export { router as enrollmentsRouter };
