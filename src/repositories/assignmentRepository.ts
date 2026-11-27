import type { Assignment } from "../types/assignment";

const API_URL = "http://localhost:5000/api/assignments";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Assignment request failed");
  }
}

// Repository handles communication with the backend API
export const assignmentRepository = {
  // Get all assignments
  getAllAssignments: async (): Promise<Assignment[]> => {
    const response = await fetch(API_URL);
    await handleResponse(response);
    return response.json();
  },

  // Get one assignment
  getAssignmentById: async (id: number): Promise<Assignment> => {
    const response = await fetch(`${API_URL}/${id}`);
    await handleResponse(response);
    return response.json();
  },

  // Add an assignment
  addAssignment: async (
    assignment: Omit<Assignment, "id">
  ): Promise<Assignment> => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    });

    await handleResponse(response);
    return response.json();
  },

  // Update an assignment
  updateAssignment: async (
    id: number,
    changes: Partial<Omit<Assignment, "id">>
  ): Promise<Assignment> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    await handleResponse(response);
    return response.json();
  },

  // Delete an assignment
  deleteAssignment: async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    await handleResponse(response);
  },
};