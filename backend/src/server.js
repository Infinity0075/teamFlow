import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./db/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());

// ❌ REMOVE complex CORS for all-in-one
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

// ================= FRONTEND SERVE =================
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// ================= SERVER =================
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
