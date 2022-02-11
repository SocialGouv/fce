import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { loadSources } from "../../services/Store/actions";
import EnterpriseView from "./Enterprise";

const LegacyEnterprise = ({ match, history, loadSources }) => {
  const siren = match.params.siren;

  useEffect(() => {
    loadSources();
  }, [loadSources]);

  return <EnterpriseView siren={siren} history={history} />;
};

LegacyEnterprise.propTypes = {
  history: PropTypes.object.isRequired,
  loadSources: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadSources: () => dispatch(loadSources()),
});

export default withRouter(connect(null, mapDispatchToProps)(LegacyEnterprise));
