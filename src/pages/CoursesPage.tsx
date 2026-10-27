import { useState } from "react";
import type { FormEvent } from "react";
import { useCourses } from "../hooks/useCourses";

function CoursesPage() {
  const { courses, error, addCourse, removeCourse } = useCourses();

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");

  // This page uses useCourses to manage the course list.
  // The hook calls the service, and the service uses the repository.
  // This keeps course rules and data separate from the page.
  const handleAddCourse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addCourse(courseCode, courseName);

    // Keep the entered values if the service reports an error.
    // We will improve this behaviour after connecting everything.
  };

  return (
    <main>
      <h1>Courses</h1>
      <p>Add and manage your current courses.</p>

      <section>
        <h2>Add Course</h2>

        <form onSubmit={handleAddCourse}>
          <div>
            <label htmlFor="course-code">Course Code</label>
            <input
              id="course-code"
              type="text"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
              placeholder="e.g. COMP-3019"
            />
          </div>

          <div>
            <label htmlFor="course-name">Course Name</label>
            <input
              id="course-name"
              type="text"
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
              placeholder="e.g. Application Design and Delivery"
            />
          </div>

          <button type="submit">Add Course</button>
        </form>

        {error && <p role="alert">{error}</p>}
      </section>

      <section>
        <h2>My Courses</h2>

        {courses.length === 0 ? (
          <p>No courses added yet.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <h3>{course.code}</h3>
                <p>{course.name}</p>

                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default CoursesPage;