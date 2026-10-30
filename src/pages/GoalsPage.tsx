

import { useState } from "react";
import type { FormEvent } from "react";
import { useGoals } from "../hooks/useGoals";

/*
  Sprint 3 - Study Goals

  This component handles the user interface.
  The useGoals hook provides the goal data and actions.
  The service handles validation and business rules.
  The repository manages CRUD operations.
*/

export default function GoalsPage() {
  const {
    goals,
    addGoal,
    updateGoal,
    removeGoal,
    toggleComplete,
  } = useGoals();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState("");
  const [editTitle, setEditTitle] = useState("");

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      addGoal(category, title);
      setCategory("");
      setTitle("");
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to add goal"
      );
    }
  }

  function handleEdit(
    id: number,
    currentCategory: string,
    currentTitle: string
  ) {
    setEditingId(id);
    setEditCategory(currentCategory);
    setEditTitle(currentTitle);
    setError("");
  }

  function handleSave(id: number) {
    try {
      updateGoal(id, editCategory, editTitle);
      setEditingId(null);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update goal"
      );
    }
  }

  function handleDelete(id: number) {
    try {
      removeGoal(id);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete goal"
      );
    }
  }

  function handleComplete(id: number) {
    try {
      toggleComplete(id);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to change status"
      );
    }
  }

  const completedCount = goals.filter(
    (goal) => goal.completed
  ).length;

  return (
    <main>
      <h1>Study Goals</h1>
      <p>Manage your study goals and track your progress.</p>

      <section>
        <h2>Goal Progress</h2>
        <p>Total Goals: {goals.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Remaining: {goals.length - completedCount}</p>
      </section>

      <section>
        <h2>Add New Goal</h2>

        <form onSubmit={handleAdd} noValidate>
          <div>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Daily Study">Daily Study</option>
              <option value="Weekly Goal">Weekly Goal</option>
              <option value="Programming">Programming</option>
              <option value="Exam Preparation">Exam Preparation</option>
              <option value="Project">Project</option>
            </select>
          </div>

          <div>
            <label htmlFor="title">Goal Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter study goal"
            />
          </div>

          <button type="submit">Add Goal</button>
        </form>
      </section>

      {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

      <section>
        <h2>My Study Goals</h2>

        {goals.length === 0 && <p>No goals available.</p>}

        {goals.map((goal) => (
          <article key={goal.id}>
            {editingId === goal.id ? (
              <div>
                <h3>Edit Goal</h3>

                <input
                  aria-label="Edit category"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />

                <input
                  aria-label="Edit title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => handleSave(goal.id)}
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3>{goal.title}</h3>
                <p>Category: {goal.category}</p>

                <label>
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => handleComplete(goal.id)}
                  />
                  Completed
                </label>

                <p>
                  Status: {goal.completed ? "Completed" : "Not Completed"}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(goal.id, goal.category, goal.title)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(goal.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
