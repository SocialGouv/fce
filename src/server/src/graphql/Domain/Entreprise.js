import { buildSchema } from "graphql";
import ApiEntreprise from "../../models/ApiEntreprise";

export const entrepriseTypes = buildSchema(`
  type Query {
    extraitsRcsInfogreffe(siren: String!): ExtraitRcs
    association(siren: String!): Association
    finance(siret:String!):[DonneeEcofi]
    tva_intracommunautaire(siren:String!):TvaIntracommunautaire
    mandataires(siren:String!):[MandataireData]
  }

  type TvaIntracommunautaire {
  tva_number: String
  }
    type DonneeEcofi {
      data:Finance
    }
    type Finance {
      chiffre_affaires: Float
      date_fin_exercice: String
    }

  type Association {
    rna: String
  }
  type MandataireData {
    data:MandataireSocial
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
    date_extrait: String
    observations: [ObservationRcs]
    capital:Capital
  }

  type Capital {
    montant: Float
  }  

  type ObservationRcs {
    date: String
    numero: Int
    libelle: String
  }
`);

const api = new ApiEntreprise({ log: true });

export const entrepriseResolvers = {
  Query: {
    extraitsRcsInfogreffe: async (_, { siren }) => {
      try {
        const extraitsRcsInfogreffe = await api.getRcsInfogreffeBySiren(siren);
        return extraitsRcsInfogreffe;
      } catch (error) {
        console.error(
          `Failed to fetch extraits Rcs Infogreffe for siren ${siren}: ${error}`
        );
        return null;
      }
    },
    association: async (_, { siren }) => {
      try {
        const association = await api.getAssociation(siren);
        return association;
      } catch (error) {
        console.error(
          `Failed to fetch association data for siret ${siren}: ${error}`
        );
        return null;
      }
    },
    finance: async (_, { siret }) => {
      try {
        const finance = await api.getExercices(siret);
        return finance;
      } catch (error) {
        console.error(
          `Failed to fetch finace indicators for siren ${siret}: ${error}`
        );
        return null;
      }
    },
    tva_intracommunautaire: async (_, { siren }) => {
      try {
        const tva_intracommunautaire = await api.getTva(siren);
        return tva_intracommunautaire;
      } catch (error) {
        console.error(`Failed to fetch tva for siren ${siren}: ${error}`);
        return null;
      }
    },
    mandataires: async (_, { siren }) => {
      try {
        const mandataires = await api.getMandatairesSociaux(siren);
        return mandataires;
      } catch (error) {
        console.error(
          `Failed to fetch mandataires for siren ${siren}: ${error}`
        );
        return null;
      }
    },
  },
};
