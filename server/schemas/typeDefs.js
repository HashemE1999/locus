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

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        trips: [Trip]
    }

    type Query {
        getUser(id: ID!): User
        getAllUsers: [User]
        getTrip(id: ID!): Trip
        getAllTrips: [Trip]
        getAttraction(id: ID!): Attraction
        getAllAttractions: [Attraction]
    }
`;
