const typeDefs = `
    scalar Date

    type Trip {
        _id: ID!
        attractions: [Attraction]
    }

    type Attraction {
        _id: ID!
        name: String!
        category: String!
        rank: Int
        tags: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        trips: [Trip]
    }
        
    type Query {
        getAllUsers: [User]
        getUser(id: ID!): User
        me: User
    }     
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addTrip(attractions: [attractions]): Trip
        removeTrip(tripId: ID!): Trip  
    }   
`;
