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
    const task = await TaskService.createTask({
      ...payload,
      userId: ctx.user.id,
    });

    return task;
  },

  deleteTask: async (
    parent: any,
    { id }: { id: string }, // Adjusting the type based on your Task model
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    // Delete the task
    await TaskService.deleteTask(id);

    return "Task deleted successfully";
  },

  updateTask: async (
    parent: any,
    { id, payload }: { id: string; payload: UpdateTask },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");

    // Update the task
    const updatedTask = await TaskService.updateTasK(id, payload);

    return updatedTask;
  },
};

const queries = {
  getTask: async (parent: any, args: any, ctx: GraphqlContext) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    const tasks = await TaskService.getTask(ctx.user.id);

    return tasks;
  },
};

const extraResolvers = {
  Task: {
    user: (parent: Task) => UserService.getUserById(parent.userId),
  },
};

export const resolvers = { mutations, extraResolvers, queries };
