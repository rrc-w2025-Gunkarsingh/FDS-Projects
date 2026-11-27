
import type { Goal } from "../types/goal";

const API_URL = "http://localhost:5000/api/goals";

let goals: Goal[] = [];

const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Goal API request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const goalRepository = {
  getAll(): Goal[] {
    return goals;
  },

  getById(id: number): Goal | undefined {
    return goals.find((goal) => goal.id === id);
  },

  async load() {
    goals = await request<Goal[]>(API_URL);
    notifyListeners();
  },

  async create(data: Omit<Goal, "id">) {
    const goal = await request<Goal>(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    goals = [...goals, goal];
    notifyListeners();
    return goal;
  },

  async update(
    id: number,
    changes: Partial<Omit<Goal, "id">>
  ) {
    const goal = await request<Goal>(`${API_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(changes),
    });

    goals = goals.map((item) =>
      item.id === id ? goal : item
    );

    notifyListeners();
    return goal;
  },

  async remove(id: number) {
    await request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    goals = goals.filter((goal) => goal.id !== id);
    notifyListeners();
  },

  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};
