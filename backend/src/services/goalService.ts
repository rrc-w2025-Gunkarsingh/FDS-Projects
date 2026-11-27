
import { prisma } from "../lib/prisma";

type GoalData = {
  category: string;
  title: string;
  completed: boolean;
};

export const goalService = {
  async getAll() {
    return prisma.goal.findMany({
      orderBy: { id: "asc" },
    });
  },

  async getById(id: number) {
    return prisma.goal.findUnique({
      where: { id },
    });
  },

  async create(data: GoalData) {
    return prisma.goal.create({
      data,
    });
  },

  async update(id: number, data: Partial<GoalData>) {
    return prisma.goal.update({
      where: { id },
      data,
    });
  },

  async remove(id: number) {
    return prisma.goal.delete({
      where: { id },
    });
  },
};
