import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

/**
 * Universal Auth Guard
 * - Verifies JWT
 * - Attaches req.user
 * - Optionally checks role
 * - Optionally enforces onboarding
 */
const authGuard = (options = {}) =>
  asyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id, role, iat, exp }

    req.user = decoded;

    // 🔒 ROLE CHECK (admin / user)
    if (options.role && decoded.role !== options.role) {
      res.status(403);
      throw new Error(`${options.role} access only`);
    }

    // 🧭 ONBOARDING CHECK
    if (options.requireOnboarding === true && req.user.isOnboarded === false) {
      res.status(403);
      throw new Error("Onboarding required");
    }

    next();
  });

export default authGuard;
