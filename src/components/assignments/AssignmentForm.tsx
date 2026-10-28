import { useState } from "react";
import type { FormEvent } from "react";

import { useAssignments } from "../../hooks/useAssignments";
import { useCourses } from "../../hooks/useCourses";

/*
  This form adds assignments using useAssignments.

  It gets the course list from useCourses instead
  of using hardcoded course names.

  The assignment service handles validation.
*/

export default function AssignmentForm() {
  const { addAssignment } = useAssignments();

  // Get courses from Sania's feature
  const { courses } = useCourses();

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
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
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
            onChange={(event) => setTitle(event.target.value)}
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
            onChange={(event) => setCourse(event.target.value)}
          >
            <option value="">Select a course</option>

            {courses.map((item) => (
              <option key={item.id} value={item.code}>
                {item.code} - {item.name}
              </option>
            ))}
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
            onChange={(event) => setDueDate(event.target.value)}
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