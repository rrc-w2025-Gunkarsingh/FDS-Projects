type GoalItemProps = {
  id: number;
  category: string;
  goal: string;
  removeGoal: (id: number) => void;
};

function GoalItem({
  id,
  category,
  goal,
  removeGoal,
}: GoalItemProps) {
  return (
    <div>
      <p>
        <strong>{category}:</strong> {goal}
      </p>

      <button
        type="button"
        onClick={() => removeGoal(id)}
      >
        Remove
      </button>
    </div>
  );
}

export default GoalItem;