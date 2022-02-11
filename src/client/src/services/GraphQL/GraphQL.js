import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Auth from "../Auth";
import config from "../Config";

const fceGraphqlLink = createHttpLink({
  uri: `${config.get("api_endpoint")}/graphql`,
});

const bceGraphqlLink = createHttpLink({
  uri: `${config.get("api_endpoint")}/bce/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const BCE_CLIENT = "BCE";
export const FCE_CLIENT = "FCE";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === BCE_CLIENT,
    authLink.concat(bceGraphqlLink),
    authLink.concat(fceGraphqlLink)
  ),
});
