
import { useSyncExternalStore } from "react";
import { goalService } from "../services/goalService";

/*
  Custom React hook for the Study Goals feature.

  Returns:
  goals - List of all study goals
  addGoal - Adds a new goal
  updateGoal - Edits an existing goal
  removeGoal - Deletes a goal
  toggleComplete - Marks a goal complete or incomplete

  The hook connects React components to the service.
  Business logic stays in goalService.ts.
*/

export function useGoals() {
  const goals = useSyncExternalStore(
    goalService.subscribe,
    goalService.getGoals
  );

  return {
    goals,
    addGoal: goalService.addGoal,
    updateGoal: goalService.updateGoal,
    removeGoal: goalService.removeGoal,
    toggleComplete: goalService.toggleComplete,
  };
}
