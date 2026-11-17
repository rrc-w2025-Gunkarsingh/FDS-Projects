import { useCourses } from "../hooks/useCourses";

/*
  This component uses the useCourses hook to show
  the total number of courses.

  The hook gets course data through the service
  and repository, so this component does not
  access the test data directly.
*/

function CourseSummary() {
  const { courses } = useCourses();

  return (
    <section>
      <h2>Course Summary</h2>
      <p>Total Courses: {courses.length}</p>
    </section>
  );
}

export default CourseSummary;