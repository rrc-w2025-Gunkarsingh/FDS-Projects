import type { Dispatch, SetStateAction } from "react";
import type { Assignment } from "../../types/assignment";
import AssignmentCard from "./AssignmentCard";

type AssignmentListProps = {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function AssignmentList({
  assignments,
  setAssignments,
}: AssignmentListProps) {
  const handleRemove = (id: number) => {
    setAssignments((currentAssignments) =>
      currentAssignments.filter((assignment) => assignment.id !== id)
    );
  };

  const handleToggleComplete = (id: number) => {
    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              completed: !assignment.completed,
            }
          : assignment
      )
    );
  };

  return (
    <section>
      <h2>My Assignments</h2>

      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onRemove={handleRemove}
            onToggleComplete={handleToggleComplete}
          />
        ))
      )}
    </section>
  );
}

export default AssignmentList;