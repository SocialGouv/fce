import React from "react";
import PropTypes from "prop-types";
import EstablishmentView from "./EstablishmentView";
import EnterpriseView from "./EnterpriseView";

const Direccte = ({ establishment, enterprise }) => {
  return establishment ? (
    <EstablishmentView establishment={establishment} />
  ) : enterprise ? (
    <EnterpriseView enterprise={enterprise} />
  ) : (
    (() => {
      throw new Error("Expected establishment or enterprise in Direccte props");
    })()
  );
};

Direccte.propTypes = {
  enterprise: PropTypes.object,
  establishment: PropTypes.object
};

export default Direccte;
