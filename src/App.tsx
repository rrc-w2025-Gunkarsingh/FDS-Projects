import { Routes, Route, Link } from "react-router-dom";
import StudyOverview from "./components/study-overview/StudyOverview";
import GoalPage from "./pages/GoalPage";
import "./App.css";

function App() {
  return (
    <>
      <header className="app-header">
        <h1>Study Planner</h1>
        <p>Organize your studies. Stay on track. Reach your goals.</p>

        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/goals">Goals</Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <main className="app-main">
              <StudyOverview />
            </main>
          }
        />

        <Route path="/goals" element={<GoalPage />} />
      </Routes>

      <footer className="app-footer">
        <p>Study Planner Team</p>
        <p>Team Members - Gunkar, Sania, Bhumika</p>
      </footer>
    </>
  );
}

export default App;