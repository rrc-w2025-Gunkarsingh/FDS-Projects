import { useEffect, useState } from "react";
import type { Course } from "../types/course";
import { courseService } from "../services/courseService";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load courses from the backend
  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load courses when the component opens
  useEffect(() => {
    void loadCourses();
  }, []);

  // Add a course
  const addCourse = async (code: string, name: string) => {
    try {
      setError("");

      await courseService.addCourse(code, name);
      await loadCourses();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not add course"
      );
      return false;
    }
  };

  // Remove a course
  const removeCourse = async (id: number) => {
    try {
      setError("");

      await courseService.deleteCourse(id);
      await loadCourses();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete course"
      );
      return false;
    }
  };

  // Update a course
  const updateCourse = async (
    id: number,
    code: string,
    name: string
  ) => {
    try {
      setError("");

      await courseService.updateCourse(id, code, name);
      await loadCourses();

      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update course"
      );
      return false;
    }
  };

  // Return the values that components can use
  return {
    courses,
    error,
    loading,
    loadCourses,
    addCourse,
    removeCourse,
    updateCourse,
  };
}