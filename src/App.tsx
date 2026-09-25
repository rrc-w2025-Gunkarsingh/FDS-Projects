import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import GoalsPage from "./pages/GoalsPage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Route>
    </Routes>
  );
}

export default App;