import express from "express";
import StudentController from "../controllers/student";

const router = express.Router();

router.post("/students", StudentController.register);

export { router as studentsRouter };
