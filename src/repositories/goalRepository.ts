
import type { Goal } from "../types/goal";
import { sampleGoals } from "../data/goals";

// Store a copy of the sample goals in memory.
let goals: Goal[] = sampleGoals.map((goal) => ({ ...goal }));

// Generate unique IDs for new goals.
let nextId = Math.max(0, ...goals.map((goal) => goal.id)) + 1;

// Notify React components when goal data changes.
const listeners = new Set<() => void>();

// Keep a stable snapshot for React's useSyncExternalStore.
let snapshot: Goal[] = [...goals];

function notifyListeners() {
  snapshot = goals.map((goal) => ({ ...goal }));

  listeners.forEach((listener) => listener());
}

export const goalRepository = {
  // READ: Get all goals.
  getAll(): Goal[] {
    return snapshot;
  },

  // READ: Find one goal by ID.
  getById(id: number): Goal | undefined {
    return goals.find((goal) => goal.id === id);
  },

  // CREATE: Add a new goal.
  create(data: Omit<Goal, "id">): Goal {
    const newGoal: Goal = {
      ...data,
      id: nextId++,
    };

    goals = [...goals, newGoal];

    notifyListeners();

    return newGoal;
  },

  // UPDATE: Change an existing goal.
  update(
    id: number,
    changes: Partial<Omit<Goal, "id">>
  ): Goal | undefined {
    const existingGoal = goals.find(
      (goal) => goal.id === id
    );

    if (!existingGoal) {
      return undefined;
    }

    const updatedGoal: Goal = {
      ...existingGoal,
      ...changes,
    };

    goals = goals.map((goal) =>
      goal.id === id ? updatedGoal : goal
    );

    notifyListeners();

    return updatedGoal;
  },

  // DELETE: Remove a goal.
  remove(id: number): void {
    goals = goals.filter((goal) => goal.id !== id);

    notifyListeners();
  },

  // Subscribe to goal changes.
  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};
