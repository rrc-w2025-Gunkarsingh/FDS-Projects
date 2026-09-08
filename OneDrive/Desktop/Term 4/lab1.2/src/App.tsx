import "./App.css";
import { Header } from "./components/header";
import { Footer } from "./components/Footer";
import { EmployeeCard } from "./components/EmployeeCard";
import type { Employee } from "./types";

const employees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    position: "Financial Analyst",
    department: "Finance",
    email: "john.smith@example.com",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    position: "Software Developer",
    department: "Technology",
    email: "sarah.johnson@example.com",
  },
];

function App() {
  return (
    <>
      <Header />

      <main>
        <h1>Our Employees</h1>

        <section className="employees">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;