import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";

import "./loading-wrapper.scss";

const withLoading = BaseComponent => {
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
    isLoaded: PropTypes.bool.isRequired
  };

  return WrappedComponent;
};

export default withLoading;
