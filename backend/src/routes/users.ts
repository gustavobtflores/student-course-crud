import express from "express";
import UserController from "../controllers/users";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/users", UserController.register);
router.post("/users/authenticate", UserController.login);
router.get("/users/me", authMiddleware, UserController.me);

export { router as usersRouter };
