export const mutations = `
#graphql
createTask(payload : CreateTask!) : Task!
deleteTask(id: String!): String!
updateTask(id: String!, payload: UpdateTask!): Task!
`;
