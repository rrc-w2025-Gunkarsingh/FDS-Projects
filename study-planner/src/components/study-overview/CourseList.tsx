function CourseList() {
  const courses = [
    {
      code: "COMP-3019",
      name: "Application Design and Delivery",
      progress: "75%",
    },
    {
      code: "COMP-3018",
      name: "Back-End Development",
      progress: "65%",
    },
    {
      code: "COMP-3020",
      name: "Cloud Infrastructure",
      progress: "80%",
    },
  ];

  return (
    <article className="study-card">
      <h3>Courses</h3>

      <div className="study-card__section">
        <h4>Current Courses</h4>

        {courses.map((course) => (
          <div key={course.code}>
            <p>
              {course.code} - {course.name}
            </p>
            <p>Progress: {course.progress}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default CourseList;