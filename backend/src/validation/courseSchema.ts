import { z } from "zod";

// Validate information when adding or updating a course
export const courseSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Course code is required"),

  name: z
    .string()
    .trim()
    .min(1, "Course name is required"),
});

// Validate the course ID in the URL
export const courseIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});