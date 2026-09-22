function AssignmentList() {
  const assignments = [
    {
      name: "Back-End API Project",
      course: "COMP-3018",
      dueDate: "September 25",
    },
    {
      name: "Cloud Infrastructure Lab",
      course: "COMP-3020",
      dueDate: "September 27",
    },
    {
      name: "Secure Coding Assignment",
      course: "COMP-3021",
      dueDate: "September 30",
    },
  ];

  return (
    <article className="study-card">
      <h3>Assignments</h3>

      <div className="study-card__section">
        <h4>Upcoming Assignments</h4>

        {assignments.map((assignment) => (
          <div key={assignment.name}>
            <p>{assignment.name}</p>
            <p>{assignment.course}</p>
            <p>Due: {assignment.dueDate}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AssignmentList;
