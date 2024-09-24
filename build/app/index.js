"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = initServer;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const cors_1 = __importDefault(require("cors"));
const jwt_1 = __importDefault(require("../services/jwt"));
const task_1 = require("./task");
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        const graphqlServer = new server_1.ApolloServer({
            typeDefs: `
        ${user_1.User.types}
        ${task_1.Task.types}
        type Query {
            ${user_1.User.queries}
            ${task_1.Task.queries}
        }
        
        type Mutation {
          ${task_1.Task.mutations}
        }
    `,
            resolvers: Object.assign(Object.assign({ Query: Object.assign(Object.assign({}, user_1.User.resolvers.queries), task_1.Task.resolvers.queries), Mutation: Object.assign({}, task_1.Task.resolvers.mutations) }, task_1.Task.resolvers.extraResolvers), user_1.User.resolvers.extraResolvers),
        });
        yield graphqlServer.start();
        app.use("/graphql", (0, express4_1.expressMiddleware)(graphqlServer, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req, res }) {
                return {
                    user: req.headers.authorization
                        ? jwt_1.default.decodeToken(req.headers.authorization.split("Bearer ")[1])
                        : undefined,
                };
            }),
        }));
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send(err.message);
        });
        return app;
    });
}
