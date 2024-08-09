import PropTypes from "prop-types";
import React from "react";

import EnterpriseView from "./Enterprise";

const LegacyEnterprise = ({ siren }) => {
  return <EnterpriseView siren={siren} />;
};

LegacyEnterprise.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default LegacyEnterprise;
