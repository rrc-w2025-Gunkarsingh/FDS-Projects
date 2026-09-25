import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GoalsPage from "./pages/GoalsPage";
import Layout from "./components/layout/Layout";

import type { Assignment } from "./types/assignment";

function App() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Backend API Project",
      course: "COMP-3018",
      dueDate: "2026-09-30",
      completed: false,
    },
    {
      id: 2,
      title: "React Sprint 2",
      course: "COMP-3019",
      dueDate: "2026-10-02",
      completed: false,
    },
  ]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <HomePage
              assignments={assignments}
              setAssignments={setAssignments}
            />
          }
        />

        <Route
          path="/courses"
          element={
            <CoursesPage
              assignments={assignments}
              setAssignments={setAssignments}
            />
          }
        />

        <Route
          path="/assignments"
          element={
            <AssignmentsPage
              assignments={assignments}
              setAssignments={setAssignments}
            />
          }
        />

        <Route
          path="/goals"
          element={
            <GoalsPage
              assignments={assignments}
              setAssignments={setAssignments}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;