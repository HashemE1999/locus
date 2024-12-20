const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Trip {
    _id: ID!
    attractions: [Attraction]
    created: Date
  }

  type Attraction {
    _id: ID!
    name: String!
    date: Date!
    attractionId: Int
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
    trips: [Trip!]
  }

  input AttractionInput {
    name: String!
    attractionId: Int!
    date: Date
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    me: User
    getTrip(tripId: ID!): Trip
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTrip(attractions: [AttractionInput]): Trip
    removeTrip(tripId: ID!): Trip
    editTrip(attractions: [AttractionInput]): Trip
  }
`;

module.exports = typeDefs;
