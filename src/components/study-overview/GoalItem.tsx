interface GoalItemProps {
  category: string;
  goal: string;
  onRemove: () => void;
}

function GoalItem({ category, goal, onRemove }: GoalItemProps) {
  return (
    <div>
      <h3>{category}</h3>
      <p>{goal}</p>

      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default GoalItem;