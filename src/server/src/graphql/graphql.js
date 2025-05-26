import { ApolloServer } from "@apollo/server";

import { entrepriseResolvers, entrepriseTypes } from "./Domain/Entreprise";
import {
  etablissementResolvers,
  etablissementTypes,
} from "./Domain/Etablissement";

const path = "/api/graphql";

export const setupGraphql = async (app) => {
  const server = new ApolloServer({
    typeDefs: [entrepriseTypes, etablissementTypes],
    resolvers: [entrepriseResolvers, etablissementResolvers],
  });

  await server.start();
};
