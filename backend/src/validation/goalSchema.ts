
import { z } from "zod";

export const goalIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createGoalSchema = z.object({
  category: z.string().trim().min(1),
  title: z.string().trim().min(1),
  completed: z.boolean().default(false),
}).strict();

export const updateGoalSchema = z.object({
  category: z.string().trim().min(1).optional(),
  title: z.string().trim().min(1).optional(),
  completed: z.boolean().optional(),
}).strict().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be updated" }
);
