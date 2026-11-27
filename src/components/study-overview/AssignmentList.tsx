import { useAssignments } from "../../hooks/useAssignments";

/*
  This component uses the shared assignment hook.

  It displays assignments from the repository
  instead of using a separate hardcoded list.
*/

export default function AssignmentList() {
  const { assignments } = useAssignments();

  const upcomingAssignments = assignments.filter(
    (assignment) => !assignment.completed
  );

  return (
    <article className="study-card">
      <h3>Assignments</h3>

      <div className="study-card__section">
        <h4>Upcoming Assignments</h4>

        {upcomingAssignments.length === 0 ? (
          <p>No upcoming assignments.</p>
        ) : (
          upcomingAssignments.map((assignment) => (
            <div key={assignment.id}>
              <p>{assignment.title}</p>

              <p>{assignment.course}</p>

              <p>Due: {assignment.dueDate}</p>
            </div>
          ))
        )}
      </div>
    </article>
  );
}