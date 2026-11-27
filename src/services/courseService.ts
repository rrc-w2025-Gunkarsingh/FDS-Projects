import type { Course } from "../types/course";
import { courseRepository } from "../repositories/courseRepository";

// Get all courses
const getAllCourses = async (): Promise<Course[]> => {
  return await courseRepository.getAllCourses();
};

// Get one course
const getCourseById = async (
  id: number
): Promise<Course | undefined> => {
  return await courseRepository.getCourseById(id);
};

// Add a course
const addCourse = async (
  code: string,
  name: string
): Promise<Course> => {
  // Check if the fields are empty
  if (!code.trim() || !name.trim()) {
    throw new Error("Course code and name are required");
  }

  // Check if the course already exists
  const courses = await courseRepository.getAllCourses();

  const existingCourse = courses.find(
    (course) =>
      course.code.toLowerCase() === code.trim().toLowerCase()
  );

  if (existingCourse) {
    throw new Error("This course already exists");
  }

  // Send the new course to the backend
  const newCourse: Course = {
    id: 0,
    code: code.trim(),
    name: name.trim(),
  };

  return await courseRepository.addCourse(newCourse);
};

// Update a course
const updateCourse = async (
  id: number,
  code: string,
  name: string
): Promise<Course> => {
  if (!code.trim() || !name.trim()) {
    throw new Error("Course code and name are required");
  }

  const existingCourse = await courseRepository.getCourseById(id);

  if (!existingCourse) {
    throw new Error("Course not found");
  }

  const courses = await courseRepository.getAllCourses();

  const duplicateCourse = courses.find(
    (course) =>
      course.id !== id &&
      course.code.toLowerCase() === code.trim().toLowerCase()
  );

  if (duplicateCourse) {
    throw new Error("This course already exists");
  }

  return await courseRepository.updateCourse(id, {
    id,
    code: code.trim(),
    name: name.trim(),
  });
};

// Delete a course
const deleteCourse = async (id: number): Promise<void> => {
  await courseRepository.deleteCourse(id);
};

// Export the service methods
export const courseService = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};