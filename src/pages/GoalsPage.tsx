import { useAssignments } from "../hooks/useAssignments";

/*
  GoalsPage uses the shared assignment hook.

  It reads assignment progress without receiving
  assignment data through props.
*/

export default function GoalsPage() {
  const { assignments } = useAssignments();

  const completed = assignments.filter(
    (assignment) => assignment.completed
  ).length;

  return (
    <main>
      <h1>Study Goals</h1>

      <p>Manage your study goals.</p>

      <section>
        <h2>Assignment Progress</h2>

        <p>Total Assignments: {assignments.length}</p>

        <p>Completed Assignments: {completed}</p>

        <p>
          Remaining Assignments: {assignments.length - completed}
        </p>
      </section>
    </main>
  );
}