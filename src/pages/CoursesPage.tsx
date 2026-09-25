import type { Dispatch, SetStateAction } from "react";
import type { Assignment } from "../types/assignment";

type CoursesPageProps = {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function CoursesPage({ assignments }: CoursesPageProps) {
  return (
    <main>
      <h1>Courses</h1>

      <p>View your current courses and progress.</p>

      <section>
        <h2>Shared Assignment Information</h2>
        <p>Total assignments: {assignments.length}</p>
      </section>
    </main>
  );
}

export default CoursesPage;