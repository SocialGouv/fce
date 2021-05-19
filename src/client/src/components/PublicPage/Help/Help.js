import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UsersFeedback from "../../../containers/UsersFeedback";
import LoadSpinner from "../../shared/LoadSpinner";
import Config from "../../../services/Config";

import "./help.scss";

const Help = ({ pageData = null, isLoading, hasError }) => {
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
              {pageData?.videos?.map(item => {
                return (
                  <li className="help-video__item" key={item.titre}>
                    <div className="help-video__title">{item.titre}</div>
                    <video className="help-video__video" controls>
                      <source
                        src={`${Config.get("strapi.domain")}${item.video.url}`}
                        type="video/mp4"
                      />
                      <p>
                        Votre navigateur ne prend pas en charge les vidéos
                        HTML5. Voici{" "}
                        <a
                          href={`${Config.get("strapi.domain")}${
                            item.video.url
                          }`}
                        >
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
  pageData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default Help;
