import { useState } from "react";
import type { FormEvent } from "react";
import { useAssignments } from "../hooks/useAssignments";

function AssignmentsPage() {
  const {
    assignments,
    loading,
    error,
    addAssignment,
    updateAssignment,
    toggleAssignment,
    removeAssignment,
  } = useAssignments();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Add or update an assignment
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    try {
      let success = false;

      if (editingId !== null) {
        success = await updateAssignment(editingId, {
          title: title.trim(),
          course: course.trim(),
          dueDate: new Date(`${dueDate}T12:00:00`).toISOString(),
        });
      } else {
        success = await addAssignment(title, course, dueDate);
      }

      if (success) {
        resetForm();
      }
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCourse("");
    setDueDate("");
    setEditingId(null);
  };

  // Fill the form with an existing assignment
  const handleEdit = (assignment: {
    id: number;
    title: string;
    course: string;
    dueDate: string;
  }) => {
    setEditingId(assignment.id);
    setTitle(assignment.title);
    setCourse(assignment.course);
    setDueDate(assignment.dueDate.slice(0, 10));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <h1>Assignments</h1>
      <p>Add and manage your assignments.</p>

      <section>
        <h2>{editingId !== null ? "Edit Assignment" : "Add Assignment"}</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="assignment-title">Assignment Title</label>
            <input
              id="assignment-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. React Sprint 4"
              required
            />
          </div>

          <div>
            <label htmlFor="assignment-course">Course Code</label>
            <input
              id="assignment-course"
              type="text"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
              placeholder="e.g. COMP-3019"
              required
            />
          </div>

          <div>
            <label htmlFor="assignment-date">Due Date</label>
            <input
              id="assignment-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId !== null
                ? "Update Assignment"
                : "Add Assignment"}
          </button>

          {editingId !== null && (
            <button type="button" onClick={resetForm} disabled={saving}>
              Cancel
            </button>
          )}
        </form>

        {error && <p role="alert">{error}</p>}
      </section>

      <section>
        <h2>My Assignments</h2>

        {loading ? (
          <p>Loading assignments...</p>
        ) : assignments.length === 0 ? (
          <p>No assignments added yet.</p>
        ) : (
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <h3>{assignment.title}</h3>
                <p>Course: {assignment.course}</p>
                <p>Due: {assignment.dueDate.slice(0, 10)}</p>
                <p>
                  Status: {assignment.completed ? "Completed" : "Pending"}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    void toggleAssignment(
                      assignment.id,
                      !assignment.completed
                    )
                  }
                  disabled={saving}
                >
                  {assignment.completed ? "Mark Pending" : "Mark Complete"}
                </button>

                {" "}

                <button
                  type="button"
                  onClick={() => handleEdit(assignment)}
                  disabled={saving}
                >
                  Edit
                </button>

                {" "}

                <button
                  type="button"
                  onClick={() => void removeAssignment(assignment.id)}
                  disabled={saving}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default AssignmentsPage;