import { Router } from "express";
import { assignmentController } from "../controllers/assignmentController";
import {
  createAssignmentSchema,
  updateAssignmentSchema,
} from "../validation/assignmentSchema";
import { validate } from "../middleware/validate";

const router = Router();

// Get all assignments
router.get("/", assignmentController.getAllAssignments);

// Get one assignment by ID
router.get("/:id", assignmentController.getAssignmentById);

// Create a new assignment
router.post(
  "/",
  validate(createAssignmentSchema),
  assignmentController.createAssignment
);

// Update an assignment
router.put(
  "/:id",
  validate(updateAssignmentSchema),
  assignmentController.updateAssignment
);

// Delete an assignment
router.delete("/:id", assignmentController.deleteAssignment);

export default router;
