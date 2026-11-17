import type { Assignment } from "../types/assignment";
import { assignmentRepository } from "../repositories/assignmentRepository";

export const assignmentService = {
  // Get all assignments
  getAllAssignments: async (): Promise<Assignment[]> => {
    return await assignmentRepository.getAllAssignments();
  },

  // Get one assignment
  getAssignmentById: async (id: number): Promise<Assignment> => {
    return await assignmentRepository.getAssignmentById(id);
  },

  // Add an assignment
  addAssignment: async (
    title: string,
    course: string,
    dueDate: string
  ): Promise<Assignment> => {
    if (!title.trim() || !course.trim() || !dueDate) {
      throw new Error("All assignment fields are required");
    }

    return await assignmentRepository.addAssignment({
      title: title.trim(),
      course: course.trim(),
      dueDate: new Date(`${dueDate}T12:00:00`).toISOString(),
      completed: false,
    });
  },

  // Update an assignment
  updateAssignment: async (
    id: number,
    changes: Partial<Omit<Assignment, "id">>
  ): Promise<Assignment> => {
    if (changes.title !== undefined && !changes.title.trim()) {
      throw new Error("Assignment title cannot be empty");
    }

    if (changes.course !== undefined && !changes.course.trim()) {
      throw new Error("Course cannot be empty");
    }

    return await assignmentRepository.updateAssignment(id, changes);
  },

  // Mark an assignment complete or incomplete
  toggleAssignment: async (
    id: number,
    completed: boolean
  ): Promise<Assignment> => {
    return await assignmentRepository.updateAssignment(id, {
      completed,
    });
  },

  // Delete an assignment
  deleteAssignment: async (id: number): Promise<void> => {
    await assignmentRepository.deleteAssignment(id);
  },
};