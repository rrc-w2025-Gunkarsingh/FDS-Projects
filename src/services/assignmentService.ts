import { assignmentRepository } from "../repositories/assignmentRepository";

export const assignmentService = {
  getAssignments() {
    return assignmentRepository.getAll();
  },

  subscribe(listener: () => void) {
    return assignmentRepository.subscribe(listener);
  },

  addAssignment(
    title: string,
    course: string,
    dueDate: string
  ) {
    if (!title.trim()) {
      throw new Error("Assignment title is required");
    }

    if (!course.trim()) {
      throw new Error("Please select a course");
    }

    if (!dueDate) {
      throw new Error("Due date is required");
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) ||
      Number.isNaN(Date.parse(dueDate))
    ) {
      throw new Error("Please enter a valid due date");
    }

    return assignmentRepository.create({
      title: title.trim(),
      course: course.trim(),
      dueDate,
      completed: false,
    });
  },

  removeAssignment(id: number) {
    assignmentRepository.remove(id);
  },

  toggleComplete(id: number) {
    const assignment = assignmentRepository.getById(id);

    if (!assignment) {
      throw new Error("Assignment not found");
    }

    return assignmentRepository.update(id, {
      completed: !assignment.completed,
    });
  },

  updateAssignment(
    id: number,
    title: string,
    course: string,
    dueDate: string
  ) {
    if (!title.trim()) {
      throw new Error("Assignment title is required");
    }

    if (!course.trim()) {
      throw new Error("Course is required");
    }

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(dueDate) ||
      Number.isNaN(Date.parse(dueDate))
    ) {
      throw new Error("Valid due date is required");
    }

    return assignmentRepository.update(id, {
      title: title.trim(),
      course: course.trim(),
      dueDate,
    });
  },
};