import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import config from "../Config";
import Auth from "../Auth";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${config.get("api_endpoint")}/graphql`
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
