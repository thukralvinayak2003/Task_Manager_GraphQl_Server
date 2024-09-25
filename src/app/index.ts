import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { User } from "./user";

import cors from "cors";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";
import { Task } from "./task";

export async function initServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
        ${User.types}
        ${Task.types}
        type Query {
            ${User.queries}
            ${Task.queries}
        }
        
        type Mutation {
          ${Task.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Task.resolvers.queries,
      },

      Mutation: {
        ...Task.resolvers.mutations,
      },

      ...Task.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers,
    },
  });

  await graphqlServer.start();

  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
                req.headers.authorization.split("Bearer ")[1]
              )
            : undefined,
        };
      },
    })
  );

  return app;
}
