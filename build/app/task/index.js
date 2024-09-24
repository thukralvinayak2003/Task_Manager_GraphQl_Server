"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const types_1 = require("./types");
const resolver_1 = require("./resolver");
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
exports.Task = { types: types_1.types, resolvers: resolver_1.resolvers, mutations: mutation_1.mutations, queries: queries_1.queries };
