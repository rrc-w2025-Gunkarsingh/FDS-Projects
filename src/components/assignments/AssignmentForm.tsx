import { useState } from "react";
import type { FormEvent } from "react";

import { useAssignments } from "../../hooks/useAssignments";

/*
  AssignmentForm uses the custom hook to add assignments.

  The service validates assignment information.
  The repository stores the assignment.

  This keeps business and data logic outside the component.
*/

export default function AssignmentForm() {
  const { addAssignment } = useAssignments();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      addAssignment(title, course, dueDate);

      setTitle("");
      setCourse("");
      setDueDate("");
      setError("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add assignment"
      );
    }
  }

  return (
    <section>
      <h2>Add Assignment</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="assignment-title">
            Assignment Name
          </label>

          <input
            id="assignment-title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Enter assignment name"
          />
        </div>

        <div>
          <label htmlFor="assignment-course">
            Course
          </label>

          <select
            id="assignment-course"
            value={course}
            onChange={(event) =>
              setCourse(event.target.value)
            }
          >
            <option value="">Select a course</option>
            <option value="COMP-3018">COMP-3018</option>
            <option value="COMP-3019">COMP-3019</option>
            <option value="COMP-3020">COMP-3020</option>
            <option value="COMP-3021">COMP-3021</option>
          </select>
        </div>

        <div>
          <label htmlFor="assignment-date">
            Due Date
          </label>

          <input
            id="assignment-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
          />
        </div>

        {error && (
          <p role="alert" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit">
          Add Assignment
        </button>
      </form>
    </section>
  );
}