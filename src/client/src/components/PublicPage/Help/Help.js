import "./help.scss";

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import UsersFeedback from "../../../containers/UsersFeedback";
import Config from "../../../services/Config";
import LoadSpinner from "../../shared/LoadSpinner";

const Help = ({ pageData = null, isLoading, hasError }) => {
  const strapiPath = Config.get("strapi.domain");
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
            <h1>Aide</h1>

            <p>
              <strong>
                Si vous avez d&apos;autres interrogations sur FCE pensez à
                consulter notre <Link to="/faq">Foire aux questions</Link>
              </strong>
            </p>
            <h2>Nos tutoriels</h2>

            <ul className="help__videos">
              {pageData?.videos?.map((item) => {
                return (
                  <li className="help-video__item" key={item.titre}>
                    <div className="help-video__title">{item.titre}</div>
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video className="help-video__video" controls>
                      <source
                        src={`${strapiPath}${item.video.url}`}
                        type="video/mp4"
                      />
                      <p>
                        Votre navigateur ne prend pas en charge les vidéos
                        HTML5. Voici{" "}
                        <a href={item.video.url}>
                          un lien pour télécharger la vidéo
                        </a>
                        .
                      </p>
                    </video>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
      <UsersFeedback fullWidth />
    </>
  );
};

Help.propTypes = {
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageData: PropTypes.object,
};

export default Help;
