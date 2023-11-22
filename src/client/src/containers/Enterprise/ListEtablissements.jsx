import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import ListEstablishmentsResult from "../../components/DataSheets/Sections/ListEstablishmentsResult/ListEstablishmentsResult.jsx";

const ListEtablissements = ({ match, history }) => {
  const siren = match.params.siren;
  return <ListEstablishmentsResult siren={siren} history={history} />;
};

ListEtablissements.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withRouter(ListEtablissements);
