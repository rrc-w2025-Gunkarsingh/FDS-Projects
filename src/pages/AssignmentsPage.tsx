import type { Dispatch, SetStateAction } from "react";
import AssignmentForm from "../components/assignments/AssignmentForm";
import AssignmentList from "../components/assignments/AssignmentList";
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

      <p>
        Manage your assignments and keep track of upcoming work.
      </p>

      <AssignmentForm setAssignments={setAssignments} />

      <AssignmentList
        assignments={assignments}
        setAssignments={setAssignments}
      />
    </main>
  );
}

export default AssignmentsPage;