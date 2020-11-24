import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./unsubscribePage.scss";

const UnsubscribePage = ({
  unsubscriptionResponse: { isLoading, message, hasError }
}) => {
  const unsubscribeMessage = isLoading ? "Désinscription en cours..." : message;

  return (
    <div className="page content unsubscribe-page">
      <div className="has-text-centered">
        <h1 className="title">Désinscription de notre liste de contacts</h1>
        <div
          className={classNames("notification", {
            "is-danger": hasError,
            "is-success": !hasError
          })}
        >
          {unsubscribeMessage}
        </div>
      </div>
    </div>
  );
};

UnsubscribePage.propTypes = {
  unsubscriptionResponse: PropTypes.shape({
    isLoading: PropTypes.bool,
    message: PropTypes.string,
    hasError: PropTypes.bool
  })
};

export default UnsubscribePage;
