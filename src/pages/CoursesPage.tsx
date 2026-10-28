import { useState } from "react";
import type {
  Dispatch,
  FormEvent,
  SetStateAction,
} from "react";

type Course = {
  id: number;
  code: string;
  name: string;
};

type CoursesPageProps = {
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
};

function CoursesPage({
  courses,
  setCourses,
}: CoursesPageProps) {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");

  const handleAddCourse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!courseCode.trim() || !courseName.trim()) {
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      code: courseCode.trim(),
      name: courseName.trim(),
    };

    setCourses((currentCourses) => [
      ...currentCourses,
      newCourse,
    ]);

    setCourseCode("");
    setCourseName("");
  };

  const handleRemoveCourse = (id: number) => {
    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== id)
    );
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
              onChange={(event) =>
                setCourseCode(event.target.value)
              }
              placeholder="e.g. COMP-3019"
            />
          </div>

          <div>
            <label htmlFor="course-name">Course Name</label>

            <input
              id="course-name"
              type="text"
              value={courseName}
              onChange={(event) =>
                setCourseName(event.target.value)
              }
              placeholder="e.g. Application Design and Delivery"
            />
          </div>

          <button type="submit">Add Course</button>
        </form>
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
                  onClick={() => handleRemoveCourse(course.id)}
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