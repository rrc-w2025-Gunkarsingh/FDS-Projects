import type { Assignment } from "../types/assignment";
import { sampleAssignments } from "../data/assignments";

let assignments: Assignment[] = sampleAssignments.map(
  (assignment) => ({ ...assignment })
);

let nextId =
  Math.max(...assignments.map((assignment) => assignment.id), 0) + 1;

const listeners = new Set<() => void>();

let snapshot: Assignment[] = [...assignments];

function notify() {
  snapshot = assignments.map((assignment) => ({ ...assignment }));

  listeners.forEach((listener) => listener());
}

export const assignmentRepository = {
  getAll(): Assignment[] {
    return snapshot;
  },

  getById(id: number): Assignment | undefined {
    return assignments.find(
      (assignment) => assignment.id === id
    );
  },

  create(data: Omit<Assignment, "id">): Assignment {
    const newAssignment: Assignment = {
      ...data,
      id: nextId++,
    };

    assignments = [...assignments, newAssignment];

    notify();

    return newAssignment;
  },

  update(
    id: number,
    changes: Partial<Omit<Assignment, "id">>
  ): Assignment | undefined {
    const existing = assignments.find(
      (assignment) => assignment.id === id
    );

    if (!existing) {
      return undefined;
    }

    const updated = {
      ...existing,
      ...changes,
    };

    assignments = assignments.map((assignment) =>
      assignment.id === id ? updated : assignment
    );

    notify();

    return updated;
  },

  remove(id: number): void {
    assignments = assignments.filter(
      (assignment) => assignment.id !== id
    );

    notify();
  },

  subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },
};