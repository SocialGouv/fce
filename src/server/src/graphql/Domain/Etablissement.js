import { buildSchema } from "graphql";
import ApiEntreprise from "../../models/ApiEntreprise";

export const etablissementTypes = buildSchema(`
  type Query {
    etablissement(siret: String!): Etablissement
  }

  type Etablissement {
    siret: String!
    siege_social: Boolean!
    naf: String
    libelle_naf: String
    date_mise_a_jour: Int
    tranche_effectif_salarie_etablissement: TrancheEffectif
    date_creation_etablissement: Int!
    region_implantation: CodeValueEntity!
    commune_implantation: CodeValueEntity!
    pays_implantation: CodeValueEntity!
    diffusable_commercialement: Boolean!
    enseigne: String
    effectifs_mensuels(maxCount: Int): [EffectifMensuel]
  }

  type TrancheEffectif {
    de: Int
    a: Int
    code: String
    date_reference: String
    intitule: String
  }

  type EffectifMensuel {
    mois: Int
    annee: Int
    effectifs_mensuels: Float
  }

  type CodeValueEntity {
    code: String!
    value: String!
  }
`);

const api = new ApiEntreprise();

export const etablissementResolvers = {
  Query: {
    etablissement: (parent, { siret }) => api.getEtablissementBySiret(siret),
  },
  Etablissement: {
    effectifs_mensuels: (parent, { maxCount }) =>
      api.getLastEtablissementEffectifsMensuelBySiretAndDate(
        parent?.siret,
        { date: new Date(), length: maxCount }
      )
  }
}
