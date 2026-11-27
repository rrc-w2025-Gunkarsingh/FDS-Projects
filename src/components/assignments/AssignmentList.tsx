import AssignmentCard from "./AssignmentCard";

import { useAssignments } from "../../hooks/useAssignments";

/*
  AssignmentList uses the custom hook.

  It displays assignments and allows users
  to remove or complete assignments.

  The hook connects to the service,
  which communicates with the repository.
*/

export default function AssignmentList() {
  const {
    assignments,
    removeAssignment,
    toggleComplete,
  } = useAssignments();

  return (
    <section>
      <h2>My Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onRemove={removeAssignment}
            onToggleComplete={toggleComplete}
          />
        ))
      )}
    </section>
  );
}