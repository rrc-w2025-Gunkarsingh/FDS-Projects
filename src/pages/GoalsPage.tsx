import type { Dispatch, SetStateAction } from "react";
import type { Assignment } from "../types/assignment";

type GoalsPageProps = {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function GoalsPage({ assignments }: GoalsPageProps) {
  return (
    <main>
      <h1>Study Goals</h1>
      <p>Shared assignments: {assignments.length}</p>
    </main>
  );
}

export default GoalsPage;