import { Task } from "@prisma/client";
import { GraphqlContext } from "../../interfaces";
import TaskService, { UpdateTask } from "../../services/task";
import { createTaskPayload } from "../../services/task";
import UserService from "../../services/user";

const mutations = {
  createTask: async (
    parent: any,
    { payload }: { payload: createTaskPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    try {
      const task = await TaskService.createTask({
        ...payload,
        userId: ctx.user.id,
      });
      return task;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task");
    }
  },

  deleteTask: async (
    parent: any,
    { id }: { id: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    try {
      await TaskService.deleteTask(id);
      return "Task deleted successfully";
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  },

  updateTask: async (
    parent: any,
    { id, payload }: { id: string; payload: UpdateTask },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    try {
      const updatedTask = await TaskService.updateTasK(id, payload);
      return updatedTask;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  },
};

const queries = {
  getTask: async (parent: any, args: any, ctx: GraphqlContext) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    try {
      const tasks = await TaskService.getTask(ctx.user.id);
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to retrieve tasks");
    }
  },
};

const extraResolvers = {
  Task: {
    user: async (parent: Task) => {
      try {
        return await UserService.getUserById(parent.userId);
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to retrieve user");
      }
    },
  },
};

export const resolvers = { mutations, extraResolvers, queries };
