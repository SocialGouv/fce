import PropTypes from "prop-types";
import React from "react";

import { Establishment } from "../../components/DataSheets";

const EstablishementContainer = ({ siret, history }) => {
  return <Establishment siret={siret} history={history} />;
};

EstablishementContainer.propTypes = {
  history: PropTypes.object,
  siret: PropTypes.object.isRequired,
};

export default EstablishementContainer;
