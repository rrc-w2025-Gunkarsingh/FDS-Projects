import StudyOverview from "../components/study-overview/StudyOverview";

import { useAssignments } from "../hooks/useAssignments";

/*
  HomePage uses the same custom assignment hook.

  This allows assignment data to be shared
  between the Home and Assignments pages.
*/

export default function HomePage() {
  const { assignments } = useAssignments();

  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  );

  return (
    <main>
      <StudyOverview />

      <section>
        <h2>Assignment Summary</h2>

        <p>Total Assignments: {assignments.length}</p>

        <p>
          Completed Assignments: {completedAssignments.length}
        </p>

        <p>
          Remaining Assignments:{" "}
          {assignments.length - completedAssignments.length}
        </p>

        {assignments.map((assignment) => (
          <article key={assignment.id}>
            <h3>{assignment.title}</h3>

            <p>Course: {assignment.course}</p>

            <p>Due: {assignment.dueDate}</p>

            <p>
              Status:{" "}
              {assignment.completed
                ? "Completed"
                : "Not Completed"}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}