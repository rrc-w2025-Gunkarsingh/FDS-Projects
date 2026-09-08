import type { Employee } from "../types";

interface EmployeeCardProps {
  employee: Employee;
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  return (
    <article className="employee-card">
      <h2>{employee.name}</h2>
      <p>{employee.position}</p>
      <p>{employee.department}</p>
      <p>{employee.email}</p>
    </article>
  );
}