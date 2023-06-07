import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import EstablishmentView from "./Establishment";

const LegacyEnterprise = ({ match, history }) => {
  const siret = match.params.siret;
  return <EstablishmentView siret={siret} history={history} />;
};

LegacyEnterprise.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(LegacyEnterprise);
