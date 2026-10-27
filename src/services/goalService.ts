
import { goalRepository } from "../repositories/goalRepository";

export const goalService = {
  // Get all goals from the repository.
  getGoals() {
    return goalRepository.getAll();
  },

  // Notify components when goals change.
  subscribe(listener: () => void) {
    return goalRepository.subscribe(listener);
  },

  // Add a new goal after validation.
  addGoal(category: string, title: string) {
    if (!category.trim()) {
      throw new Error("Goal category is required");
    }

    if (!title.trim()) {
      throw new Error("Goal title is required");
    }

    return goalRepository.create({
      category: category.trim(),
      title: title.trim(),
      completed: false,
    });
  },

  // Update an existing goal after validation.
  updateGoal(
    id: number,
    category: string,
    title: string
  ) {
    if (!category.trim()) {
      throw new Error("Goal category is required");
    }

    if (!title.trim()) {
      throw new Error("Goal title is required");
    }

    if (!goalRepository.getById(id)) {
      throw new Error("Goal not found");
    }

    return goalRepository.update(id, {
      category: category.trim(),
      title: title.trim(),
    });
  },

  // Mark a goal completed or incomplete.
  toggleComplete(id: number) {
    const goal = goalRepository.getById(id);

    if (!goal) {
      throw new Error("Goal not found");
    }

    return goalRepository.update(id, {
      completed: !goal.completed,
    });
  },

  // Remove a goal.
  removeGoal(id: number) {
    if (!goalRepository.getById(id)) {
      throw new Error("Goal not found");
    }

    goalRepository.remove(id);
  },
};
