import React from "react";
import PropTypes from "prop-types";

const Unsubscribe = ({ unsubscriptionResponse: { isLoading, message } }) => {
  const unsubscribeMessage = isLoading ? "Désinscription en cours..." : message;

  return (
    <div className="has-text-centered">
      <h1 className="title">Désinscription de notre liste de contacts</h1>
      <div>{unsubscribeMessage}</div>
    </div>
  );
};

Unsubscribe.propTypes = {
  unsubscriptionResponse: PropTypes.shape({
    isLoading: PropTypes.bool,
    success: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.bool
  })
};

export default Unsubscribe;
