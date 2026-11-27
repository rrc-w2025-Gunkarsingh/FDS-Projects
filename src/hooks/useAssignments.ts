import { useSyncExternalStore } from "react";

import { assignmentService } from "../services/assignmentService";

/*
  Custom hook for assignment components.

  Returned values:

  assignments:
  Current list of assignments.

  addAssignment:
  Adds a new assignment.

  removeAssignment:
  Deletes an assignment.

  toggleComplete:
  Changes assignment completion status.

  updateAssignment:
  Updates assignment information.
*/

export function useAssignments() {
  const assignments = useSyncExternalStore(
    assignmentService.subscribe,
    assignmentService.getAssignments
  );

  return {
    assignments,

    addAssignment: assignmentService.addAssignment,

    removeAssignment: assignmentService.removeAssignment,

    toggleComplete: assignmentService.toggleComplete,

    updateAssignment: assignmentService.updateAssignment,
  };
}