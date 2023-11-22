// Cette fonction affiche les informations de développement économique en fonction d'un numéro de SIRET.
// À SUPPRIMER : Vérifier si cette fonction est toujours utilisée et si elle peut être supprimée en toute sécurité.
import PropTypes from "prop-types";
import React from "react";

import {
  getEti,
  getFilieres,
  hasFilieres,
  isEti,
} from "../../../../../utils/interactions/interactions";
import {
  getPole,
  isPole,
} from "../../../../../utils/poleCompetitivite/poleCompetitivite";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Data from "../../SharedComponents/Data/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import { useDeveloppementEconomiqueData } from "./DeveloppementEconomique.gql";

const DeveloppementEconomique = ({ siret }) => {
  const { loading, data, error } = useDeveloppementEconomiqueData(siret);

  const poles = data?.poleCompetitivite?.filter(isPole).map(getPole).join(", ");

  return (
    <Subcategory subtitle="Développement économique" sourceSi="EOS">
      <LoadableContent error={error} loading={loading}>
        <Data
          name="Filière stratégique"
          nonEmptyValue=""
          emptyValue="Non"
          value={
            getFilieres(data?.interactionsPole3e.find(hasFilieres)) || null
          }
        />
        <Data
          name="ETI / PEPITE"
          nonEmptyValue=""
          emptyValue="Non"
          value={getEti(data?.interactionsPole3e.find(isEti)) || null}
        />
        <Data
          name="Adhérent à un pole de compétitivité"
          nonEmptyValue=""
          emptyValue="Non"
          value={poles || null}
        />
      </LoadableContent>
    </Subcategory>
  );
};

DeveloppementEconomique.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default DeveloppementEconomique;
