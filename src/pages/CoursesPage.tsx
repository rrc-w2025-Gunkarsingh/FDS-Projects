import { useState } from "react";
import type { FormEvent } from "react";
import { useCourses } from "../hooks/useCourses";

function CoursesPage() {
  const {
    courses,
    error,
    loading,
    addCourse,
    removeCourse,
    updateCourse,
  } = useCourses();

  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<number | null>(null);

  // Add a new course or update an existing course
  const handleSubmitCourse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);

    try {
      let success = false;

      if (editingCourseId !== null) {
        // Update an existing course
        success = await updateCourse(
          editingCourseId,
          courseCode,
          courseName
        );
      } else {
        // Add a new course
        success = await addCourse(courseCode, courseName);
      }

      if (success) {
        setCourseCode("");
        setCourseName("");
        setEditingCourseId(null);
      }
    } finally {
      setSaving(false);
    }
  };

  // Remove a course using the backend API
  const handleRemoveCourse = async (id: number) => {
    const success = await removeCourse(id);

    if (success && editingCourseId === id) {
      setEditingCourseId(null);
      setCourseCode("");
      setCourseName("");
    }
  };

  // Fill the form with the selected course information
  const handleEditCourse = (
    id: number,
    code: string,
    name: string
  ) => {
    setEditingCourseId(id);
    setCourseCode(code);
    setCourseName(name);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCourseId(null);
    setCourseCode("");
    setCourseName("");
  };

  return (
    <main>
      <h1>Courses</h1>
      <p>Add and manage your current courses.</p>

      <section>
        <h2>
          {editingCourseId !== null ? "Edit Course" : "Add Course"}
        </h2>

        <form onSubmit={handleSubmitCourse}>
          <div>
            <label htmlFor="course-code">Course Code</label>
            <input
              id="course-code"
              type="text"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
              placeholder="e.g. COMP-3019"
              required
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
              required
            />
          </div>

          <button type="submit" disabled={saving}>
            {saving
              ? editingCourseId !== null
                ? "Updating..."
                : "Adding..."
              : editingCourseId !== null
                ? "Update Course"
                : "Add Course"}
          </button>

          {editingCourseId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </form>

        {error && <p role="alert">{error}</p>}
      </section>

      <section>
        <h2>My Courses</h2>

        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses added yet.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <h3>{course.code}</h3>
                <p>{course.name}</p>

                {/* Edit Course Button */}
                <button
                  type="button"
                  onClick={() =>
                    handleEditCourse(
                      course.id,
                      course.code,
                      course.name
                    )
                  }
                  disabled={saving}
                >
                  Edit
                </button>

                {" "}

                {/* Remove Course Button */}
                <button
                  type="button"
                  onClick={() => void handleRemoveCourse(course.id)}
                  disabled={saving}
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