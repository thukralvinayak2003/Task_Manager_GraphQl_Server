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
    try {
      const task = await prismaClient.task.create({
        data: {
          title: data.title,
          description: data.description,
          status: data.status,
          user: { connect: { id: data.userId } },
        },
      });

      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task");
    }
  }

  public static async getTask(userId: string) {
    try {
      const tasks = await prismaClient.task.findMany({
        where: { userId },
      });
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  }

  public static async deleteTask(id: string) {
    try {
      return await prismaClient.task.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  }

  public static async updateTasK(id: string, payload: UpdateTask) {
    try {
      return await prismaClient.task.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  }
}

export default TaskService;
