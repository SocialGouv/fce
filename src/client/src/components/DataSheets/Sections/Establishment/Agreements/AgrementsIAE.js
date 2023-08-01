import PropTypes from "prop-types";
import React from "react";

import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Data from "../../SharedComponents/Data/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import { useIaeEstablishment } from "./AgrementsIAE.gql";

const AgrementsIAE = ({ siret }) => {
  const { loading, data: agrements, error } = useIaeEstablishment(siret);

  if (loading || error) {
    return null;
  }

  return (
    <LoadableContent loading={loading} error={error}>
      <Subcategory
        subtitle="Insertion par l'activité économique (IAE)"
        sourceSi="IAE"
      >
        <LoadableContent error={error} loading={loading}>
          <Data
            name="Entreprise d'insertion (EI)"
            nonEmptyValue=""
            emptyValue="Non"
            className="has-no-border"
            value={agrements?.kind_ei ?? "Non"}
          />
          <Data
            name="Association intermédiaire (AI)"
            nonEmptyValue=""
            emptyValue="Non"
            className="has-no-border"
            value={agrements?.kind_ai ?? "Non"}
          />
          <Data
            name="Atelier et chantier d'insertion (ACI)"
            nonEmptyValue=""
            emptyValue="Non"
            className="has-no-border"
            value={agrements?.kind_aci ?? "Non"}
          />
          <Data
            name="Entreprise de travail temporaire d'insertion (ETTI)"
            nonEmptyValue=""
            emptyValue="Non"
            className="has-no-border"
            value={agrements?.kind_etti ?? "Non"}
          />
          <Data
            name="Entreprise adaptée (EA)"
            nonEmptyValue=""
            emptyValue="Non"
            className="has-no-border"
            value={agrements?.kind_ea ?? "Non"}
          />
        </LoadableContent>
      </Subcategory>
    </LoadableContent>
  );
};

AgrementsIAE.propTypes = { siret: PropTypes.string.isRequired };

export default AgrementsIAE;
