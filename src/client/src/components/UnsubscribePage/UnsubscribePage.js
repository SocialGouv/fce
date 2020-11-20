import React from "react";
import PropTypes from "prop-types";

const UnsubscribePage = ({
  unsubscriptionResponse: { isLoading, message }
}) => {
  const unsubscribeMessage = isLoading ? "Désinscription en cours..." : message;

  return (
    <div className="page content">
      <div className="has-text-centered">
        <h1 className="title">Désinscription de notre liste de contacts</h1>
        <div>{unsubscribeMessage}</div>
      </div>
    </div>
  );
};

UnsubscribePage.propTypes = {
  unsubscriptionResponse: PropTypes.shape({
    isLoading: PropTypes.bool,
    success: PropTypes.bool,
    message: PropTypes.string,
    error: PropTypes.bool
  })
};

export default UnsubscribePage;
