import express from "express";
import { onboardUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// USER onboarding (NOT admin)
router.post("/onboarding", protect, onboardUser);

export default router;
