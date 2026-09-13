import "./StudyOverview.css";

function StudyOverview() {
  const studyItems = [
    {
      id: 1,
      course: "COMP-3019",
      task: "Application Design and Delivery",
      type: "Assignment",
      due: "September 18, 2026",
    },
    {
      id: 2,
      course: "COMP-3018",
      task: "Back-End Development",
      type: "Project",
      due: "September 22, 2026",
    },
    {
      id: 3,
      course: "COMP-3020",
      task: "Cloud Infrastructure and Development",
      type: "Lab",
      due: "September 25, 2026",
    },
  ];

  return (
    <section className="study-overview">
      <h2>Study Overview</h2>

      <p>
        Keep track of your upcoming courses, assignments, projects, and
        important study deadlines.
      </p>

      <div className="study-overview__list">
        {studyItems.map((item) => (
          <article className="study-card" key={item.id}>
            <h3>{item.task}</h3>
            <p>
              <strong>Course:</strong> {item.course}
            </p>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            <p>
              <strong>Due:</strong> {item.due}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default StudyOverview;