import "./StudyOverview.css";
import CourseList from "./CourseList";
import AssignmentList from "./AssignmentList";
import StudyGoalList from "./StudyGoalList";

function StudyOverview() {
  return (
    <section className="study-overview">
      <h2>Study Overview</h2>

      <p>
        Keep track of your courses, assignments, and study goals in one place.
      </p>

      <div className="study-overview__list">
        <CourseList />
        <AssignmentList />
        <StudyGoalList />
      </div>
    </section>
  );
}

export default StudyOverview;