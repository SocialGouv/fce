import PropTypes from "prop-types";
import React from "react";

import { Establishment } from "../../components/DataSheets";

const EstablishementContainer = (siret) => {
  return <Establishment siret={siret} />;
};

EstablishementContainer.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EstablishementContainer;
