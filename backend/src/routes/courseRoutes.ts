import { Router } from "express";
import * as courseController from "../controllers/courseController.js";
import { validate } from "../middleware/validate.js";
import {
  courseSchema,
  courseIdSchema,
} from "../validation/courseSchema.js";

const router = Router();

// Get all courses
router.get("/", courseController.getAllCourses);

// Get one course
router.get(
  "/:id",
  validate(courseIdSchema, "params"),
  courseController.getCourseById
);

// Add a course
router.post(
  "/",
  validate(courseSchema),
  courseController.addCourse
);

// Update a course
router.put(
  "/:id",
  validate(courseIdSchema, "params"),
  validate(courseSchema),
  courseController.updateCourse
);

// Delete a course
router.delete(
  "/:id",
  validate(courseIdSchema, "params"),
  courseController.deleteCourse
);

export default router;