import "./pgApiDataHandler.scss";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const PgApiDataHandler = ({ isLoading, error, children }) => {
  if (error) {
    return (
      <div className="pg-api-data-handler__message pg-api-data-handler__message--error">
        Une erreur est survenue pendant le chargement des données.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pg-api-data-handler__message">
        <span>Chargement en cours </span>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }

  return children;
};

PgApiDataHandler.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

export default PgApiDataHandler;
