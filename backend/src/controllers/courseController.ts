import type { Request, Response } from "express";
import * as courseService from "../services/courseService.js";

// Get all courses
export const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch {
    res.status(500).json({ error: "Could not load courses" });
  }
};

// Get one course
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const course = await courseService.getCourseById(id);

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.json(course);
  } catch {
    res.status(500).json({ error: "Could not load course" });
  }
};

// Add a course
export const addCourse = async (req: Request, res: Response) => {
  try {
    const { code, name } = req.body;
    const course = await courseService.addCourse(code, name);

    res.status(201).json(course);
  } catch (error: unknown) {
    // Prisma P2002 means a unique value already exists
    if (
      error !== null &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        error: "A course with this code already exists",
      });
      return;
    }

    res.status(500).json({ error: "Could not add course" });
  }
};

// Update a course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { code, name } = req.body;

    const course = await courseService.updateCourse(id, code, name);
    res.json(course);
  } catch (error: unknown) {
    if (
      error !== null &&
      typeof error === "object" &&
      "code" in error
    ) {
      // Course does not exist
      if (error.code === "P2025") {
        res.status(404).json({
          error: "Course not found",
        });
        return;
      }

      // Course code already exists
      if (error.code === "P2002") {
        res.status(409).json({
          error: "A course with this code already exists",
        });
        return;
      }
    }

    res.status(500).json({ error: "Could not update course" });
  }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await courseService.deleteCourse(id);
    res.status(204).send();
  } catch (error: unknown) {
    // Prisma P2025 means the course does not exist
    if (
      error !== null &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2025"
    ) {
      res.status(404).json({
        error: "Course not found",
      });
      return;
    }

    res.status(500).json({
      error: "Could not delete course",
    });
  }
};