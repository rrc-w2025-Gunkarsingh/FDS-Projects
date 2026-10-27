import { useEffect, useState } from "react";
import type { Course } from "../types/course";
import { courseService } from "../services/courseService";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  // Load courses when the component opens
  const loadCourses = () => {
    setCourses(courseService.getAllCourses());
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Add a course
  const addCourse = (code: string, name: string) => {
    try {
      courseService.addCourse(code, name);
      loadCourses();
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // Remove a course
  const removeCourse = (id: number) => {
    courseService.deleteCourse(id);
    loadCourses();
  };

  // Update a course
  const updateCourse = (id: number, code: string, name: string) => {
    try {
      courseService.updateCourse(id, code, name);
      loadCourses();
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // Return the values that components can use
  return {
    courses,       // List of courses to display
    error,         // Error message to display
    loadCourses,   // Reload courses
    addCourse,     // Add a new course
    removeCourse,  // Remove a course by ID
    updateCourse,  // Update an existing course
  };
}