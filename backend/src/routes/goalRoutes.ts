
import { Router } from "express";
import { goalController } from "../controllers/goalController";
import { validate } from "../middleware/validate";

import {
  goalIdSchema,
  createGoalSchema,
  updateGoalSchema,
} from "../validation/goalSchema";

const router = Router();

router.get("/", goalController.getAll);

router.get(
  "/:id",
  validate(goalIdSchema, "params"),
  goalController.getById
);

router.post(
  "/",
  validate(createGoalSchema),
  goalController.create
);

router.patch(
  "/:id",
  validate(goalIdSchema, "params"),
  validate(updateGoalSchema),
  goalController.update
);

router.delete(
  "/:id",
  validate(goalIdSchema, "params"),
  goalController.remove
);

export default router;

