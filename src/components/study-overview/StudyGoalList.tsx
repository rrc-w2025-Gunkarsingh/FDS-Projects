import { useState } from "react";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";

type StudyGoal = {
  id: number;
  category: string;
  goal: string;
};

function StudyGoalList() {
  const [goals, setGoals] = useState<StudyGoal[]>([
    {
      id: 1,
      category: "Weekly Goal",
      goal: "Complete 3 assignments",
    },
    {
      id: 2,
      category: "Study Time",
      goal: "Study 15 hours",
    },
    {
      id: 3,
      category: "Review",
      goal: "Review course notes",
    },
  ]);

  const [newGoal, setNewGoal] = useState("");

  function addGoal() {
    if (newGoal.trim() === "") {
      return;
    }

    const goal: StudyGoal = {
      id: Date.now(),
      category: "Personal Goal",
      goal: newGoal,
    };

    setGoals([...goals, goal]);
    setNewGoal("");
  }

  function removeGoal(id: number) {
    setGoals(goals.filter((goal) => goal.id !== id));
  }

  return (
    <article className="study-card">
      <h3>Study Goals</h3>

      <div className="study-card__section">
        <h4>Weekly Goals</h4>

        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            id={goal.id}
            category={goal.category}
            goal={goal.goal}
            removeGoal={removeGoal}
          />
        ))}

        <GoalForm
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          addGoal={addGoal}
        />
      </div>
    </article>
  );
}

export default StudyGoalList;