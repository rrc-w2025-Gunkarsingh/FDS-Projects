import { prisma } from "../lib/prisma.js";

// Get all courses
export const getAllCourses = async () => {
  return prisma.course.findMany();
};

// Get a course by ID
export const getCourseById = async (id: number) => {
  return prisma.course.findUnique({
    where: { id },
  });
};

// Add a course
export const addCourse = async (code: string, name: string) => {
  return prisma.course.create({
    data: {
      code: code.trim(),
      name: name.trim(),
    },
  });
};

// Update a course
export const updateCourse = async (
  id: number,
  code: string,
  name: string
) => {
  return prisma.course.update({
    where: { id },
    data: {
      code: code.trim(),
      name: name.trim(),
    },
  });
};

// Delete a course
export const deleteCourse = async (id: number) => {
  return prisma.course.delete({
    where: { id },
  });
};