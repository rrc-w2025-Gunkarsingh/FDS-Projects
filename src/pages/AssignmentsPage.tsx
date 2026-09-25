import type { Dispatch, SetStateAction } from "react";
import type { Assignment } from "../types/assignment";

type AssignmentsPageProps = {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function AssignmentsPage({
  assignments,
  setAssignments,
}: AssignmentsPageProps) {
  return (
    <main>
      <h1>Assignments</h1>

      <p>Total assignments: {assignments.length}</p>

      <button
        onClick={() => {
          setAssignments((current) => current);
        }}
      >
        Test Shared State
      </button>
    </main>
  );
}

export default AssignmentsPage;