import type { Course } from "../types/course";
import { initialCourses } from "../data/courses";

// Make a copy of our test courses
let courses: Course[] = [...initialCourses];

// Get all courses
const getAllCourses = (): Course[] => {
  return [...courses];
};

// Get one course using its ID
const getCourseById = (id: number): Course | undefined => {
  return courses.find((course) => course.id === id);
};

// Add a new course
const addCourse = (course: Course): void => {
  courses = [...courses, course];
};

// Update an existing course
const updateCourse = (id: number, updatedCourse: Course): void => {
  courses = courses.map((course) =>
    course.id === id ? { ...updatedCourse, id } : course
  );
};

// Delete a course
const deleteCourse = (id: number): void => {
  courses = courses.filter((course) => course.id !== id);
};

// Export the repository methods
export const courseRepository = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};