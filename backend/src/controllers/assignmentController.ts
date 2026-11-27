import type { Request, Response } from "express";
import { assignmentService } from "../services/assignmentService";

const getId = (value: string | string[] | undefined): number => {
  const id = Number(value);

  if (!value || Array.isArray(value) || !Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid assignment ID");
  }

  return id;
};

const handleError = (error: unknown, res: Response) => {
  const err = error as { code?: string; message?: string };

  if (err.code === "P2025") {
    return res.status(404).json({ error: "Assignment not found" });
  }

  if (err.message === "Invalid assignment ID") {
    return res.status(400).json({ error: err.message });
  }

  console.error(error);
  return res.status(500).json({ error: "Internal server error" });
};

export const assignmentController = {
  // GET /api/assignments
  getAllAssignments: async (_req: Request, res: Response) => {
    try {
      const assignments = await assignmentService.getAllAssignments();
      return res.status(200).json(assignments);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // GET /api/assignments/:id
  getAssignmentById: async (req: Request, res: Response) => {
    try {
      const id = getId(req.params.id);
      const assignment = await assignmentService.getAssignmentById(id);

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      return res.status(200).json(assignment);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // POST /api/assignments
  createAssignment: async (req: Request, res: Response) => {
    try {
      const { title, course, dueDate, completed } = req.body;

      const assignment = await assignmentService.createAssignment({
        title,
        course,
        dueDate: new Date(dueDate),
        completed: completed ?? false,
      });

      return res.status(201).json(assignment);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // PUT /api/assignments/:id
  updateAssignment: async (req: Request, res: Response) => {
    try {
      const id = getId(req.params.id);
      const { title, course, dueDate, completed } = req.body;

      const assignment = await assignmentService.updateAssignment(id, {
        ...(title !== undefined && { title }),
        ...(course !== undefined && { course }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
        ...(completed !== undefined && { completed }),
      });

      return res.status(200).json(assignment);
    } catch (error) {
      return handleError(error, res);
    }
  },

  // DELETE /api/assignments/:id
  deleteAssignment: async (req: Request, res: Response) => {
    try {
      const id = getId(req.params.id);
      await assignmentService.deleteAssignment(id);

      return res.status(204).send();
    } catch (error) {
      return handleError(error, res);
    }
  },
};