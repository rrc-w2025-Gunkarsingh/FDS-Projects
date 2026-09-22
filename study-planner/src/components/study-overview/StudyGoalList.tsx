function StudyGoalList() {
  const goals = [
    {
      category: "Weekly Goal",
      goal: "Complete 3 assignments",
    },
    {
      category: "Study Time",
      goal: "Study 15 hours",
    },
    {
      category: "Review",
      goal: "Review course notes",
    },
  ];

  return (
    <article className="study-card">
      <h3>Study Goals</h3>

      <div className="study-card__section">
        <h4>Weekly Goals</h4>

        {goals.map((goal) => (
          <div key={goal.category}>
            <p>
              <strong>{goal.category}:</strong> {goal.goal}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default StudyGoalList;
