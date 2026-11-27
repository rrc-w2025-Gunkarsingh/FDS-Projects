import { prisma } from "../lib/prisma";

export const assignmentService = {
  // Get all assignments
  getAllAssignments: async () => {
    return await prisma.assignment.findMany({
      orderBy: {
        dueDate: "asc",
      },
    });
  },

  // Get one assignment by ID
  getAssignmentById: async (id: number) => {
    return await prisma.assignment.findUnique({
      where: { id },
    });
  },

  // Create a new assignment
  createAssignment: async (data: {
    title: string;
    course: string;
    dueDate: Date;
    completed?: boolean;
  }) => {
    return await prisma.assignment.create({
      data,
    });
  },

  // Update an existing assignment
  updateAssignment: async (
    id: number,
    data: {
      title?: string;
      course?: string;
      dueDate?: Date;
      completed?: boolean;
    }
  ) => {
    return await prisma.assignment.update({
      where: { id },
      data,
    });
  },

  // Delete an assignment
  deleteAssignment: async (id: number) => {
    return await prisma.assignment.delete({
      where: { id },
    });
  },
};