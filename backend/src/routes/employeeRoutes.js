import express from "express";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();

router.use(protect);

router
  .route("/")
  .post(adminOnly, createEmployee) // 👈 admin only
  .get(getEmployees);

router
  .route("/:id")
  .put(adminOnly, updateEmployee)
  .delete(adminOnly, deleteEmployee);

export default router;
