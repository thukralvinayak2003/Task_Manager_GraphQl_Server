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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../clients/db");
class TaskService {
    static createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield db_1.prismaClient.task.create({
                data: {
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    user: { connect: { id: data.userId } },
                },
            });
            return task;
        });
    }
    static getTask(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield db_1.prismaClient.task.findMany({
                where: { userId },
            });
            return tasks;
        });
    }
    static deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prismaClient.task.delete({
                where: { id },
            });
        });
    }
    static updateTasK(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.prismaClient.task.update({
                where: { id },
                data: payload,
            });
        });
    }
}
exports.default = TaskService;
