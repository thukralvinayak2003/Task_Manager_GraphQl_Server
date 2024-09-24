"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
#graphql
createTask(payload : CreateTask!) : Task!
deleteTask(id: String!): String!
updateTask(id: String!, payload: UpdateTask!): Task!
`;
