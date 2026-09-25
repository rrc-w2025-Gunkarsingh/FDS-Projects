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

      <p>Manage your study goals.</p>

      <section>
        <h2>Assignment Progress</h2>
        <p>Total assignments: {assignments.length}</p>
      </section>
    </main>
  );
}

export default GoalsPage;