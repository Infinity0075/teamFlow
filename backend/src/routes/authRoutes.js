import express from "express";
import {
  login,
  register,
  completeOnboarding,
} from "../controllers/authController.js";
import authGuard from "../middleware/authGuard.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 👇 onboarding route (protected)
router.put("/onboarding", authGuard(), completeOnboarding);

export default router;
