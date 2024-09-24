import { User } from "@prisma/client";
import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/user";
import { prismaClient } from "../../clients/db";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const resultToken = await UserService.verifyGoogleAuthToken(token);
    return resultToken;
  },
  getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
    const id = ctx.user?.id;
    if (!id) return null;

    const user = await UserService.getUserById(id);
    return user;
  },
};

const extraResolvers = {
  User: {
    task: (parent: User) =>
      prismaClient.task.findMany({ where: { user: { id: parent.id } } }),
  },
};

export const resolvers = { queries, extraResolvers };
