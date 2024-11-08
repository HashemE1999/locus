import { gql } from "@apollo/client";

export const GET_USER_TRIPS = gql`
  query Me {
    me {
      trips {
        attractions {
          name
        }
      }
    }
  }
`;
