import { useState } from "react";

interface GoalFormProps {
  onAddGoal: (category: string, goal: string) => void;
}

function GoalForm({ onAddGoal }: GoalFormProps) {
  const [category, setCategory] = useState("Weekly Goal");
  const [goal, setGoal] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (goal.trim() === "") {
      return;
    }

    onAddGoal(category, goal);

    // Clear the form after adding
    setGoal("");
    setCategory("Weekly Goal");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Goal Category:</label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Weekly Goal">Weekly Goal</option>
          <option value="Study Time">Study Time</option>
          <option value="Review">Review</option>
          <option value="Personal Goal">Personal Goal</option>
        </select>
      </div>

      <div>
        <label htmlFor="goal">Goal:</label>

        <input
          id="goal"
          type="text"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          placeholder="Enter your study goal"
          required
        />
      </div>

      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;