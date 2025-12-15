import Employee from "../models/Employee.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json(employee);
});

export const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user.id });
  res.json(employees);
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) throw new Error("Employee not found");

  if (employee.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not allowed");
  }

  Object.assign(employee, req.body);
  res.json(await employee.save());
});

export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) throw new Error("Employee not found");

  if (employee.createdBy.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not allowed");
  }

  await employee.deleteOne();
  res.json({ message: "Employee removed" });
});
