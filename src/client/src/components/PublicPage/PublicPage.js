import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";

import UsersFeedback from "../../containers/UsersFeedback";
import LoadSpinner from "../shared/LoadSpinner";

const PublicPage = ({ pageData = null, isLoading, hasError }) => {
  if (hasError) {
    return (
      <div className="page content">
        Une erreur est survenue, impossible d{"'"}afficher le contenu de la page{" "}
        <strong>{window.location.pathname}</strong>
      </div>
    );
  }

  return (
    <>
      <div className="page content">
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <>
            <h1>{pageData && pageData.titre}</h1>
            <ReactMarkdown
              source={pageData && pageData.contenu}
              escapeHtml={false}
            />
          </>
        )}
      </div>
      <UsersFeedback fullWidth />
    </>
  );
};

PublicPage.propTypes = {
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageData: PropTypes.object,
};

export default PublicPage;
