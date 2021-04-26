import React from "react";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import PropTypes from "prop-types";
import UsersFeedback from "../../containers/UsersFeedback";
import Unsubscribe from "../../containers/Unsubscribe";
import LoadSpinner from "../shared/LoadSpinner";

// allow <br> tags to allow
const parseHtml = htmlParser({
  isValidNode: node => ["br"].includes(node.type)
});

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
              astPlugins={[parseHtml]}
            />
          </>
        )}
      </div>
      <UsersFeedback fullWidth />
      <Unsubscribe />
    </>
  );
};

PublicPage.propTypes = {
  pageData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default PublicPage;
