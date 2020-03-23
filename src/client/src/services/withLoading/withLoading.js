import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/pro-solid-svg-icons";

const withLoading = BaseComponent => {
  return function({ isLoaded, ...props }) {
    return isLoaded ? (
      <BaseComponent {...props} />
    ) : (
      <div className="container">
        <FontAwesomeIcon icon={faSpinner} spin /> Chargement en cours...
      </div>
    );
  };
};

export default withLoading;
