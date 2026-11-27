
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import { goalService } from "../services/goalService";

export function useGoals() {
  const [loadError, setLoadError] = useState("");

  const goals = useSyncExternalStore(
    goalService.subscribe,
    goalService.getGoals
  );

  useEffect(() => {
    goalService.loadGoals().catch((error) => {
      setLoadError(error.message);
    });
  }, []);

  return {
    goals,
    loadError,
    addGoal: goalService.addGoal,
    updateGoal: goalService.updateGoal,
    removeGoal: goalService.removeGoal,
    toggleComplete: goalService.toggleComplete,
  };
}
