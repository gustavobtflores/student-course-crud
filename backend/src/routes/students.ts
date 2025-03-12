import express from "express";
import StudentController from "../controllers/student";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/students", StudentController.register);
router.post("/students/authenticate", StudentController.login);
router.get("/students/me", authMiddleware, StudentController.me);

export { router as studentsRouter };
