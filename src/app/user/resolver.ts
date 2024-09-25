import { User } from "@prisma/client";
import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/user";
import { prismaClient } from "../../clients/db";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    try {
      const resultToken = await UserService.verifyGoogleAuthToken(token);
      return resultToken;
    } catch (error) {
      console.error("Error verifying Google token:", error);
      throw new Error("Failed to verify Google token");
    }
  },

  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) {
      console.warn("No user ID found in context");
      return null;
    }

    try {
      const user = await UserService.getUserById(id);
      return user;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw new Error("Failed to retrieve current user");
    }
  },
};

const extraResolvers = {
  User: {
    task: async (parent: User) => {
      try {
        const tasks = await prismaClient.task.findMany({
          where: { user: { id: parent.id } },
        });
        return tasks;
      } catch (error) {
        console.error("Error fetching tasks for user:", error);
        throw new Error("Failed to retrieve tasks for the user");
      }
    },
  },
};

export const resolvers = { queries, extraResolvers };
