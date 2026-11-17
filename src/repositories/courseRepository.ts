import type { Course } from "../types/course";

const API_URL = "http://localhost:5000/api/courses";

// Get all courses
const getAllCourses = async (): Promise<Course[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not load courses");
  }

  return response.json();
};

// Get one course
const getCourseById = async (
  id: number
): Promise<Course | undefined> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error("Could not load course");
  }

  return response.json();
};

// Add a course
const addCourse = async (course: Course): Promise<Course> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: course.code,
      name: course.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not add course");
  }

  return response.json();
};

// Update a course
const updateCourse = async (
  id: number,
  updatedCourse: Course
): Promise<Course> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: updatedCourse.code,
      name: updatedCourse.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Could not update course");
  }

  return response.json();
};

// Delete a course
const deleteCourse = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete course");
  }
};

// Export repository methods
export const courseRepository = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};