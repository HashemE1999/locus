import { gql } from "@apollo/client";

// Define the query to fetch the user's trips and their attractions
export const QUERY_USER_TRIPS = gql`
  query Me {
    me {
      trips {
        attractions {
          name
        }
      }
      username
    }
  }
`;
