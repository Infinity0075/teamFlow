import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // decoded = { id, role, iat, exp }
  req.user = decoded;

  next();
});

export default protect;
