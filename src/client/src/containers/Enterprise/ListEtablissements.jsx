import PropTypes from "prop-types";
import React from "react";

import ListEstablishmentsResult from "../../components/DataSheets/Sections/ListEstablishmentsResult/ListEstablishmentsResult.jsx";

const ListEtablissements = ({ siren }) => {
  return <ListEstablishmentsResult siren={siren} />;
};

ListEtablissements.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default ListEtablissements;
