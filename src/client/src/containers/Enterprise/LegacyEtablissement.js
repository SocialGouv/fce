import PropTypes from "prop-types";
import React from "react";

import { Establishment } from "../../components/DataSheets";

const LegacyEtablissement = ({ siret }) => {
  return <Establishment siret={siret} />;
};

LegacyEtablissement.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default LegacyEtablissement;
