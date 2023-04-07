import { buildSchema } from "graphql";
import ApiEntreprise from "../../models/ApiEntreprise";
import ApiEntrepriseV3 from "../../models/ApiEntrepriseV3";

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

const api = new ApiEntrepriseV3();

export const etablissementResolvers = {
  Query: {
    etablissement: (parent, { siret }) => api.getEtablissementBySiret(siret),
  },
};
