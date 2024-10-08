export const types = `#graphql

    enum Status {
        TODO
        IN_PROGRESS
        DONE
    }

    type Task {
        id: ID!
        title: String!
        description: String!
        status: Status
        user : User
    }
   

    input CreateTask{
        title: String!
        description: String
        status: Status
    }

 
    input UpdateTask {
        title: String
        description: String
        status: Status
    }
`;
