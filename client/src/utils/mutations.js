import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation Mutation($attractions: [AttractionInput]) {
    addTrip(attractions: $attractions) {
      attractions {
        attractionId
        date
        name
      }
      _id
    }
  }
`;

export const REMOVE_TRIP = gql`
  mutation Mutation($tripId: ID!) {
    removeTrip(tripId: $tripId) {
      _id
    }
  }
`;
