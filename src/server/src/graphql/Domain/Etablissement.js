import { buildSchema } from "graphql";
import ApiEntreprise from "../../models/ApiEntreprise";

export const etablissementTypes = buildSchema(`
  type Query {
    etablissement(siret: String!): Etablissement
  }

  type Etablissement {
    siret: String!
    tranche_effectif_salarie: TrancheEffectifSalarie
  
  }
  
  type TrancheEffectifSalarie {
    de: Int
    a: Int
    code: String
    date_reference: String
    intitule: String
  }

`);

const api = new ApiEntreprise();

export const etablissementResolvers = {
  Query: {
    etablissement: (parent, { siret }) => api.getEtablissementBySiret(siret),
  },
};
