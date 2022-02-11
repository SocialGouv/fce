import PropTypes from "prop-types";
import React from "react";

import { Establishment } from "../../components/DataSheets";
import { useEtablissementViewData } from "../../services/Entreprise/hooks";

const EstablishementContainer = ({
  establishment,
  enterprise,
  headOffice,
  apprentissage,
  successions,
  isLoaded,
  history,
}) => {
  const { loading, data } = useEtablissementViewData(enterprise.siren);

  return (
    <Establishment
      entreprise={data?.entreprises[0]}
      legacyEntreprise={enterprise}
      headOffice={headOffice}
      establishment={establishment}
      establishments={data?.entreprises[0]?.etablissements || []}
      apprentissage={apprentissage}
      history={history}
      isLoaded={isLoaded && !loading}
      successions={successions}
    />
  );
};

EstablishementContainer.propTypes = {
  apprentissage: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired,
  establishment: PropTypes.object.isRequired,
  establishments: PropTypes.arrayOf(PropTypes.object).isRequired,
  headOffice: PropTypes.object.isRequired,
  history: PropTypes.object,
  isLoaded: PropTypes.bool,
  successions: PropTypes.object.isRequired,
};

export default EstablishementContainer;
