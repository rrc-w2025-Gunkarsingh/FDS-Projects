import { useState } from "react";
import GoalForm from "./GoalForm";
import GoalItem from "./GoalItem";

interface StudyGoal {
  id: number;
  category: string;
  goal: string;
}

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

  const addGoal = (category: string, goal: string) => {
    const newGoal: StudyGoal = {
      id: Date.now(),
      category,
      goal,
    };

    setGoals([...goals, newGoal]);
  };

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <section>
      <h2>Study Goals</h2>

      <GoalForm onAddGoal={addGoal} />

      <div>
        {goals.map((goal) => (
          <GoalItem
            key={goal.id}
            category={goal.category}
            goal={goal.goal}
            onRemove={() => removeGoal(goal.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default StudyGoalList;