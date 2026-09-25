import type { Assignment } from "../../types/assignment";

type AssignmentCardProps = {
  assignment: Assignment;
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

function AssignmentCard({
  assignment,
  onRemove,
  onToggleComplete,
}: AssignmentCardProps) {
  return (
    <article>
      <h3>{assignment.title}</h3>

      <p>Course: {assignment.course}</p>

      <p>Due: {assignment.dueDate}</p>

      <label>
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={() => onToggleComplete(assignment.id)}
        />
        Completed
      </label>

      <button
        type="button"
        onClick={() => onRemove(assignment.id)}
      >
        Remove
      </button>
    </article>
  );
}

export default AssignmentCard;