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
exports.resolvers = void 0;
const task_1 = __importDefault(require("../../services/task"));
const user_1 = __importDefault(require("../../services/user"));
const mutations = {
    createTask: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        const task = yield task_1.default.createTask(Object.assign(Object.assign({}, payload), { userId: ctx.user.id }));
        return task;
    }),
    deleteTask: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id }, // Adjusting the type based on your Task model
    ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        // Delete the task
        yield task_1.default.deleteTask(id);
        return "Task deleted successfully";
    }),
    updateTask: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { id, payload }, ctx) {
        if (!ctx.user)
            throw new Error("You are not authenticated");
        // Update the task
        const updatedTask = yield task_1.default.updateTasK(id, payload);
        return updatedTask;
    }),
};
const queries = {
    getTask: (parent, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(ctx.user);
        if (!ctx.user)
            throw new Error("You are not authenticated");
        const tasks = yield task_1.default.getTask(ctx.user.id);
        return tasks;
    }),
};
const extraResolvers = {
    Task: {
        user: (parent) => user_1.default.getUserById(parent.userId),
    },
};
exports.resolvers = { mutations, extraResolvers, queries };
