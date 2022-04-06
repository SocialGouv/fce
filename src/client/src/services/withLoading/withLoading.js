import "./loading-wrapper.scss";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

const withLoading = (BaseComponent) => {
  const WrappedComponent = ({ isLoaded, ...props }) =>
    isLoaded ? (
      <BaseComponent {...props} />
    ) : (
      <div className="loading-wrapper">
        <FontAwesomeIcon icon={faSpinner} spin />
        <span className="loading-wrapper__label">Chargement en cours...</span>
      </div>
    );

  WrappedComponent.propTypes = {
    isLoaded: PropTypes.bool.isRequired,
  };

  return WrappedComponent;
};

export default withLoading;
