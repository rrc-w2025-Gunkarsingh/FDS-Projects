import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudyOverview from "./components/study-overview/StudyOverview";
import CoursesPage from "./pages/CoursesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>Study Planner</h1>
        <p>Organize your studies. Stay on track. Reach your goals.</p>
      </header>

      <nav>
        <Link to="/">Home</Link>
        {" | "}
        <Link to="/courses">Courses</Link>
      </nav>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<StudyOverview />} />
          <Route path="/courses" element={<CoursesPage />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>Study Planner Team</p>
        <p>Team Members - Gunkar, Sania, Bhumika</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;