import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";

const withLoading = BaseComponent => {
  const WrappedComponent = ({ isLoaded, ...props }) =>
    isLoaded ? (
      <BaseComponent {...props} />
    ) : (
      <div className="text-center">
        <FontAwesomeIcon icon={faSpinner} spin /> Chargement en cours...
      </div>
    );

  WrappedComponent.propTypes = {
    isLoaded: PropTypes.bool.isRequired
  };

  return WrappedComponent;
};

export default withLoading;
