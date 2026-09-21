import "./StudyOverview.css";

function StudyOverview() {
  return (
    <section className="study-overview">
      <h2>Study Overview</h2>

      <p>
        Keep track of your courses, assignments, and study goals in one place.
      </p>

      <div className="study-overview__list">

        {/* Column 1 */}
        <article className="study-card">
          <h3>Courses</h3>

          <div className="study-card__section">
            <h4>Current Courses</h4>
            <p>COMP-3019 - Application Design and Delivery</p>
            <p>COMP-3018 - Back-End Development</p>
            <p>COMP-3020 - Cloud Infrastructure</p>
          </div>

          <div className="study-card__section">
            <h4>Progress</h4>
            <p>Application Design - 75%</p>
            <p>Back-End Development - 65%</p>
            <p>Cloud Infrastructure - 80%</p>
          </div>
        </article>

        {/* Column 2 */}
        <article className="study-card">
          <h3>Assignments</h3>

          <div className="study-card__section">
            <h4>Upcoming</h4>
            <p>Back-End API Project</p>
            <p>Cloud Infrastructure Lab</p>
            <p>Secure Coding Assignment</p>
          </div>

          <div className="study-card__section">
            <h4>Due Dates</h4>
            <p>Back-End API - September 25</p>
            <p>Cloud Lab - September 27</p>
            <p>Security Assignment - September 30</p>
          </div>
        </article>

        {/* Column 3 */}
        <article className="study-card">
          <h3>Study Goals</h3>

          <div className="study-card__section">
            <h4>Weekly Goals</h4>
            <p>Complete 3 assignments</p>
            <p>Study 15 hours</p>
            <p>Review course notes</p>
          </div>

          <div className="study-card__section">
            <h4>Today's Plan</h4>
            <p>Review lecture notes</p>
            <p>Work on backend project</p>
            <p>Complete practice questions</p>
          </div>
        </article>

      </div>
    </section>
  );
}

export default StudyOverview;