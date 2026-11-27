
import { goalRepository } from "../repositories/goalRepository";

export const goalService = {
  getGoals() {
    return goalRepository.getAll();
  },

  loadGoals() {
    return goalRepository.load();
  },

  subscribe(listener: () => void) {
    return goalRepository.subscribe(listener);
  },

  async addGoal(category: string, title: string) {
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

  async updateGoal(
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

    return goalRepository.update(id, {
      category: category.trim(),
      title: title.trim(),
    });
  },

  async toggleComplete(id: number) {
    const goal = goalRepository.getById(id);

    if (!goal) {
      throw new Error("Goal not found");
    }

    return goalRepository.update(id, {
      completed: !goal.completed,
    });
  },

  async removeGoal(id: number) {
    await goalRepository.remove(id);
  },
};
