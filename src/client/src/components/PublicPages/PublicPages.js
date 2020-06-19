import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import htmlParser from "react-markdown/plugins/html-parser";
import PropTypes from "prop-types";
import UsersFeedback from "../../containers/UsersFeedback";
import Config from "../../services/Config";
import LoadSpinner from "../shared/LoadSpinner";

const strapiEndpoint = Config.get("strapi.endpoint");

// allow <br> tags to allow
const parseHtml = htmlParser({
  isValidNode: node => ["br"].includes(node.type)
});

const PublicPage = ({ page }) => {
  const [data, setData] = useState(null);

  const strapiPageUrl = `${strapiEndpoint}${Config.get(
    `strapi.pageIds.${page}`
  )}`;

  useEffect(() => {
    setData(null);
    fetch(strapiPageUrl)
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [page]);

  return (
    <>
      <div className="page content">
        {data ? (
          <>
            <h1 className="title is-1">{data.titre}</h1>
            <ReactMarkdown
              source={data.contenu}
              escapeHtml={false}
              astPlugins={[parseHtml]}
            />
          </>
        ) : (
          <LoadSpinner />
        )}
      </div>
      <UsersFeedback fullWidth />
    </>
  );
};

PublicPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PublicPage;
