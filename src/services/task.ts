import { Status } from "@prisma/client";
import { prismaClient } from "../clients/db";

export interface createTaskPayload {
  title: string;
  description?: string;
  status: Status;
  userId: string;
}

export interface UpdateTask {
  title: string;
  description: string;
  status: Status;
}

class TaskService {
  public static async createTask(data: createTaskPayload) {
    const task = await prismaClient.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        user: { connect: { id: data.userId } },
      },
    });

    return task;
  }

  public static async getTask(userId: string) {
    const tasks = await prismaClient.task.findMany({
      where: { userId },
    });
    return tasks;
  }

  public static async deleteTask(id: string) {
    return await prismaClient.task.delete({
      where: { id },
    });
  }

  public static async updateTasK(id: string, payload: UpdateTask) {
    return prismaClient.task.update({
      where: { id },
      data: payload,
    });
  }
}

export default TaskService;
