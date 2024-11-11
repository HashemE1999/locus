import "./App.css";
import { Outlet } from "react-router-dom";
// Importing necessary dependencies to initialize Apollo Server
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { StoreProvider } from "./utils/GlobalState";
import { TripProvider } from "./utils/TripState";
// Constructing main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const authToken = localStorage.getItem("id_token");
  // Returning the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  };
});

// Creating Apollo client to handle interactions with GraphQL database
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <TripProvider>
          <Navbar />
          <div className="flex-column justify-center align-center min-100-vh bg-primary">
            <Outlet />
          </div>
          <Footer />
        </TripProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
