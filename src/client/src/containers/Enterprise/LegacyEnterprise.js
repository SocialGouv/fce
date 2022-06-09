import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import EnterpriseView from "./Enterprise";

const LegacyEnterprise = ({ match, history }) => {
  const siren = match.params.siren;

  return <EnterpriseView siren={siren} history={history} />;
};

LegacyEnterprise.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(LegacyEnterprise);
