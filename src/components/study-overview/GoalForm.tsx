type GoalFormProps = {
  newGoal: string;
  setNewGoal: (goal: string) => void;
  addGoal: () => void;
};

function GoalForm(props: GoalFormProps) {
  function handleSubmit() {
    if (props.newGoal.trim() === "") {
      return;
    }

    props.addGoal();
  }

  return (
    <div>
      <h4>Add a New Goal</h4>

      <input
        type="text"
        value={props.newGoal}
        placeholder="Enter a study goal"
        onChange={(event) => props.setNewGoal(event.target.value)}
      />

      <button type="button" onClick={handleSubmit}>
        Add Goal
      </button>
    </div>
  );
}

export default GoalForm;