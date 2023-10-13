import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import UsersFeedback from "../../containers/UsersFeedback";
import ScrollToTopButton from "../DataSheets/Sections/SharedComponents/ScrollToTopButton/ScrollToTopButton.jsx";
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
    <div className="container is-fullhd">
      <div className="page content">
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <>
            <h1>{pageData && pageData.titre}</h1>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {pageData?.contenu}
            </ReactMarkdown>
          </>
        )}
      </div>
      <UsersFeedback fullWidth />
      <ScrollToTopButton />
    </div>
  );
};

PublicPage.propTypes = {
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageData: PropTypes.object,
};

export default PublicPage;
