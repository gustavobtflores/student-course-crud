import express from "express";
import StudentController from "../controllers/student";

const router = express.Router();

router.post("/students", StudentController.register);
router.post("/students/authenticate", StudentController.login);

export { router as studentsRouter };
