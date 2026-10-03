import { useState } from "react";
import type { FormEvent, Dispatch, SetStateAction } from "react";
import type { Assignment } from "../../types/assignment";

type AssignmentFormProps = {
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function AssignmentForm({
  setAssignments,
}: AssignmentFormProps) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !course.trim() || !dueDate) {
      return;
    }

    const newAssignment: Assignment = {
      id: Date.now(),
      title: title.trim(),
      course: course.trim(),
      dueDate,
      completed: false,
    };

    setAssignments((currentAssignments) => [
      ...currentAssignments,
      newAssignment,
    ]);

    setTitle("");
    setCourse("");
    setDueDate("");
  };

  return (
    <section>
      <h2>Add Assignment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="assignment-title">
            Assignment Name
          </label>

          <input
            id="assignment-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter assignment name"
          />
        </div>

        <div>
          <label htmlFor="assignment-course">
            Course
          </label>

          <input
            id="assignment-course"
            type="text"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            placeholder="e.g. COMP-3018"
          />
        </div>

        <div>
          <label htmlFor="assignment-date">
            Due Date
          </label>

          <input
            id="assignment-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />
        </div>

        <button type="submit">
          Add Assignment
        </button>
      </form>
    </section>
  );
}

export default AssignmentForm;