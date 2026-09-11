import "./MealCategories.css";

function MealCategories() {
  const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Desserts",
    "Vegetarian",
  ];

  return (
    <section className="meal-categories">
      <h2>Explore Meal Categories</h2>

      <p>Discover meals based on your favourite food categories.</p>

      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </section>
  );
}

export default MealCategories;