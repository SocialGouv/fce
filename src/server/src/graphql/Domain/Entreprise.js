import { buildSchema } from "graphql";
import ApiEntreprise from "../../models/ApiEntreprise";
import { parse } from "date-fns";



export const entrepriseTypes = buildSchema(`
  type Query {
    entreprise(siren: String!): Entreprise
    association(siret: String!): Association
  }

  type Entreprise {
    siren: String!
    capital_social: Int
    raison_sociale: String
    numero_tva_intracommunautaire: String
    forme_juridique: String
    forme_juridique_code: String
    effectifs_annuel: EffectifAnnuel
    effectifs_mensuels(date: String, length: Int): [EffectifMensuel]
    mandataires_sociaux: [MandataireSocial]
    extraits_rcs_infogreffe: ExtraitRcs
    siret_siege_social: String
    donnees_ecofi: [DonneeEcofi]
  }

  type DonneeEcofi {
    ca: Int
    date_fin_exercice: String
    date_fin_exercice_timestamp: Int
  }

  type Association {
    id: String
  }

  type EffectifMensuel {
    mois: Int
    annee: Int
    effectifs_mensuels: Float
  }

  type EffectifAnnuel {
    effectifs_annuels: Float
    annee: Int
  }

  type MandataireSocial {
    nom: String
    prenom: String
    fonction: String
    dirigeant: Boolean
    date_naissance: String
    date_naissance_timestamp: Int
    raison_sociale: String
    identifiant: String
    type: String
  }

  type ExtraitRcs {
    date_immatriculation: String
    date_immatriculation_timestamp: Int
    date_extrait: String
    observations: [ObservationRcs]
  }

  type ObservationRcs {
    date: String
    date_timestamp: Int
    numero: Int
    libelle: String
  }
`);

const api = new ApiEntreprise({ log: true });

export const entrepriseResolvers = {
  Query: {
    entreprise: (parent, { siren }) => api.getEntrepriseBySiren(siren),
    association: (parent, { siret }) => api.getAssociation(siret),
  },
  Entreprise: {
    effectifs_mensuels: (parent, { date, length }) => {
      const parsedDate = date ? parse(date, "MM/yyyy", new Date()) : new Date();
      return api.getLastEntrepriseEffectifsMensuelBySirenAndDate(parent.siren, { date: parsedDate, length });
    },
    effectifs_annuel: (parent) => api.getEntrepriseEffectifsAnnuelsBySiren(parent.siren),
    extraits_rcs_infogreffe: (parent) => api.getRcsInfogreffeBySiren(parent.siren),
    donnees_ecofi: (parent) => api.getExercice(parent.siret_siege_social)
  }
}
