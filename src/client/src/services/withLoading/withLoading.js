import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";

const withLoading = BaseComponent => {
  const WrappedComponent = ({ isLoaded, ...props }) =>
    isLoaded ? (
      <BaseComponent {...props} />
    ) : (
      <div className="flex-center mt-2">
        <FontAwesomeIcon icon={faSpinner} spin />
        <span className="ml-2">Chargement en cours...</span>
      </div>
    );

  WrappedComponent.propTypes = {
    isLoaded: PropTypes.bool.isRequired
  };

  return WrappedComponent;
};

export default withLoading;
