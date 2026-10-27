import type { Course } from "../types/course";
import { courseRepository } from "../repositories/courseRepository";

// Get all courses
const getAllCourses = (): Course[] => {
  return courseRepository.getAllCourses();
};

// Get one course
const getCourseById = (id: number): Course | undefined => {
  return courseRepository.getCourseById(id);
};

// Add a course
const addCourse = (code: string, name: string): void => {
  // Check if the fields are empty
  if (!code.trim() || !name.trim()) {
    throw new Error("Course code and name are required");
  }

  // Check if the course already exists
  const existingCourse = courseRepository
    .getAllCourses()
    .find((course) => course.code.toLowerCase() === code.trim().toLowerCase());

  if (existingCourse) {
    throw new Error("This course already exists");
  }

  // Create a new course
  const newCourse: Course = {
    id: Date.now(),
    code: code.trim(),
    name: name.trim(),
  };

  courseRepository.addCourse(newCourse);
};

// Update a course
const updateCourse = (id: number, code: string, name: string): void => {
  if (!code.trim() || !name.trim()) {
    throw new Error("Course code and name are required");
  }

  const existingCourse = courseRepository.getCourseById(id);

  if (!existingCourse) {
    throw new Error("Course not found");
  }

  const duplicateCourse = courseRepository
    .getAllCourses()
    .find(
      (course) =>
        course.id !== id &&
        course.code.toLowerCase() === code.trim().toLowerCase()
    );

  if (duplicateCourse) {
    throw new Error("This course already exists");
  }

  courseRepository.updateCourse(id, {
    id,
    code: code.trim(),
    name: name.trim(),
  });
};

// Delete a course
const deleteCourse = (id: number): void => {
  courseRepository.deleteCourse(id);
};

// Export the service methods
export const courseService = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};