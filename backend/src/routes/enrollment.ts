import { Router } from "express";
import { StudentEnrollmentController } from "../controllers/enrollment";

const router = Router();

router.post("/students/courses", StudentEnrollmentController.enrollCourse);
router.delete("/students/courses/:courseId", StudentEnrollmentController.unenrollCourse);

export default router;
