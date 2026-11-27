import { useEffect, useState } from "react";
import type { Assignment } from "../types/assignment";
import { assignmentService } from "../services/assignmentService";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load assignments from the backend
  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await assignmentService.getAllAssignments();
      setAssignments(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load assignments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadAssignments();
  }, []);

  // Add a new assignment
  const addAssignment = async (
    title: string,
    course: string,
    dueDate: string
  ): Promise<boolean> => {
    try {
      setError("");

      await assignmentService.addAssignment(title, course, dueDate);
      await loadAssignments();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not add assignment"
      );
      return false;
    }
  };

  // Update an assignment
  const updateAssignment = async (
    id: number,
    changes: Partial<Omit<Assignment, "id">>
  ): Promise<boolean> => {
    try {
      setError("");

      await assignmentService.updateAssignment(id, changes);
      await loadAssignments();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update assignment"
      );
      return false;
    }
  };

  // Mark an assignment complete or incomplete
  const toggleAssignment = async (
    id: number,
    completed: boolean
  ): Promise<boolean> => {
    try {
      setError("");

      await assignmentService.toggleAssignment(id, completed);
      await loadAssignments();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update status"
      );
      return false;
    }
  };

  // Delete an assignment
  const removeAssignment = async (id: number): Promise<boolean> => {
    try {
      setError("");

      await assignmentService.deleteAssignment(id);
      await loadAssignments();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete assignment"
      );
      return false;
    }
  };

  return {
    assignments,
    loading,
    error,
    loadAssignments,
    addAssignment,
    updateAssignment,
    toggleAssignment,
    removeAssignment,
  };
}