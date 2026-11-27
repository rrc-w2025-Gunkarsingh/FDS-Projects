
import type { Request, Response } from "express";
import { goalService } from "../services/goalService";

export const goalController = {
  async getAll(_req: Request, res: Response) {
    const goals = await goalService.getAll();
    res.json(goals);
  },

  async getById(_req: Request, res: Response) {
    const { id } = res.locals.validated.params;
    const goal = await goalService.getById(id);

    if (!goal) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    res.json(goal);
  },

  async create(_req: Request, res: Response) {
    const goal = await goalService.create(
      res.locals.validated.body
    );

    res.status(201).json(goal);
  },

  async update(_req: Request, res: Response) {
    const { id } = res.locals.validated.params;

    const existingGoal = await goalService.getById(id);

    if (!existingGoal) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    const goal = await goalService.update(
      id,
      res.locals.validated.body
    );

    res.json(goal);
  },

  async remove(_req: Request, res: Response) {
    const { id } = res.locals.validated.params;

    const existingGoal = await goalService.getById(id);

    if (!existingGoal) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    await goalService.remove(id);
    res.status(204).send();
  },
};
