import type { Assignment } from "../../types/assignment";

type AssignmentCardProps = {
  assignment: Assignment;
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

/*
  AssignmentCard displays one assignment.

  It receives presentation data and event handlers.

  Business rules are handled by the service,
  not inside this component.
*/

export default function AssignmentCard({
  assignment,
  onRemove,
  onToggleComplete,
}: AssignmentCardProps) {
  return (
    <article>
      <h3>{assignment.title}</h3>

      <p>Course: {assignment.course}</p>

      <p>Due Date: {assignment.dueDate}</p>

      <label>
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() =>
            onToggleComplete(assignment.id)
          }
        />

        Completed
      </label>

      <p>
        Status:{" "}
        {assignment.completed
          ? "Completed"
          : "Not Completed"}
      </p>

      <button
        type="button"
        onClick={() => onRemove(assignment.id)}
      >
        Remove
      </button>
    </article>
  );
}