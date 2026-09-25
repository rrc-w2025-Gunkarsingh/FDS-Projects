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
      <p>Shared assignments: {assignments.length}</p>
    </main>
  );
}

export default CoursesPage;