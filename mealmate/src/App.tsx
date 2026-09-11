import "./App.css";
import MealCategories from "./components/meal-categories/MealCategories";

function App() {
  return (
    <>
      <header>
        <h1>MealMate</h1>
      </header>

      <main>
        <MealCategories />
      </main>

      <footer>
        <p>Team MealMate</p>
        <p>Gunkar | Sania | Bhoomika</p>
      </footer>
    </>
  );
}

export default App;