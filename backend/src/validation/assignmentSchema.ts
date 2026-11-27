import { z } from "zod";

// Validate data when creating an assignment
export const createAssignmentSchema = z.object({
  title: z.string().trim().min(1, "Assignment title is required"),

  course: z.string().trim().min(1, "Course is required"),

  dueDate: z.iso.datetime({
    offset: true,
  }).or(z.iso.datetime()),

  completed: z.boolean().optional(),
});

// Validate data when updating an assignment
export const updateAssignmentSchema = createAssignmentSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided"
  );