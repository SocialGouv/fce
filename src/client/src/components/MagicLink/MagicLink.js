import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/fontawesome-pro-solid";
import "./magicLink.scss";
import { Link } from "react-router-dom";

const MagicLink = ({ hasError, errorMessage, loading }) => (
  <div className="magiclink__container container has-mt-2">
    {hasError && (
      <div>
        <div className="magiclink__message has-mb-1">{errorMessage}</div>
        <Link to={`/login`}>Faire une nouvelle demande de connexion</Link>
      </div>
    )}
    {loading && <FontAwesomeIcon icon={faSpinner} spin />}
  </div>
);

MagicLink.propTypes = {
  hasError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default MagicLink;
