import { buildSchema } from "graphql";
import ApiEntreprise from "../../models/ApiEntreprise";
import { parse } from "date-fns";
import ApiEntrepriseV3 from "../../models/ApiEntrepriseV3";

export const entrepriseTypes = buildSchema(`
  type Query {
    entreprise(siren: String!): Entreprise
    association(siret: String!): Association
  }

  type Entreprise {
    siren: String!
    capital_social: Float
    raison_sociale: String
    numero_tva_intracommunautaire: String
    forme_juridique: String
    forme_juridique_code: String
    effectifs_annuel: EffectifAnnuel
    effectifs_mensuels(date: String, length: Int): [EffectifMensuel]
    mandataires_sociaux: [MandataireData]
    extraits_rcs_infogreffe: ExtraitRcs
    siret_siege_social: SiegeSocial
    donnees_ecofi: [DonneeEcofi]
  }

  type DonneeEcofi {
    ca: Float
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
  }

  type SiegeSocial {
    siret: String
  }

  type ObservationRcs {
    date: String
    numero: Int
    libelle: String
  }
`);

const api = new ApiEntreprise({ log: true });
const apiV3 = new ApiEntrepriseV3({ log: true });

export const entrepriseResolvers = {
  Query: {
    entreprise: async (parent, { siren }) => {
      try {
        return await api.getEntrepriseBySiren(siren);
      } catch (error) {
        console.error(
          `Failed to fetch entreprise data for siren ${siren}: ${error}`
        );
        return null;
      }
    },
    association: async (parent, { siret }) => {
      try {
        return await apiV3.getAssociation(siret);
      } catch (error) {
        console.error(
          `Failed to fetch association data for siret ${siret}: ${error}`
        );
        return null;
      }
    },
  },
  Entreprise: {
    effectifs_mensuels: async (parent, { date, length }) => {
      try {
        const parsedDate = date
          ? parse(date, "MM/yyyy", new Date())
          : new Date();
        return await api.getLastEntrepriseEffectifsMensuelBySirenAndDate(
          parent.siren,
          {
            date: parsedDate,
            length,
          }
        );
      } catch (error) {
        console.error(
          `Failed to fetch effectifs mensuels data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
    numero_tva_intracommunautaire: async (parent) => {
      try {
        return await apiV3.getTva(parent.siren);
      } catch (error) {
        console.error(
          `Failed to fetch numero tva intracommunautaire data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
    siret_siege_social: async (parent) => {
      try {
        return await apiV3.getSiegeSocial(parent.siren);
      } catch (error) {
        console.error(
          `Failed to fetch siret siege social data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
    mandataires_sociaux: async (parent) => {
      try {
        return await apiV3.getMandatairesSociaux(parent.siren);
      } catch (error) {
        console.error(
          `Failed to fetch mandataires sociaux data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
    effectifs_annuel: async (parent) => {
      try {
        return await api.getEntrepriseEffectifsAnnuelsBySiren(parent.siren);
      } catch (error) {
        console.error(
          `Failed to fetch effectifs annuels data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
    extraits_rcs_infogreffe: async (parent) => {
      try {
        return await apiV3.getRcsInfogreffeBySiren(parent.siren);
      } catch (error) {
        console.error(
          `Failed to fetch extraits rcs infogreffe data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
    donnees_ecofi: async (parent) => {
      try {
        return await api.getExercice(parent.siret_siege_social.siret);
      } catch (error) {
        console.error(
          `Failed to fetch extraits rcs infogreffe data for siren ${parent.siren}: ${error}`
        );
        return null;
      }
    },
  },
};
