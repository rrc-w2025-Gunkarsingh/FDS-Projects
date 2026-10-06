import type { Dispatch, SetStateAction } from "react";
import StudyOverview from "../components/study-overview/StudyOverview";
import type { Assignment } from "../types/assignment";

type HomePageProps = {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function HomePage({ assignments }: HomePageProps) {
  return (
    <main>
      <StudyOverview />

      <section>
  <h2>Assignment Summary</h2>

  <p>Total assignments: {assignments.length}</p>

  {assignments.map((assignment) => (
    <article key={assignment.id}>
      <h3>{assignment.title}</h3>

      <p>
        <strong>Course:</strong> {assignment.course}
      </p>

      <p>
        <strong>Due:</strong> {assignment.dueDate}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {assignment.completed ? "Completed" : "Not Completed"}
      </p>
    </article>
  ))}
</section>
    </main>
  );
}

export default HomePage;