import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./landingHeader.scss";

const LandingHeader = ({ hasSharedButton = false }) => {
  const marianneLogo = "img/FCE_logo_marianne.png";
  const fceLogo = "img/FCE_logo.png";

  return (
    <>
      <div className="header columns is-hidden-mobile is-justify-content-space-between">
        <div className="column is-9">
          <Link to="/">
            <img
              className="header__marianne"
              src={marianneLogo}
              alt="marianne"
            />
          </Link>
          <div className="header__text">
            <p>{`FICHE COMMUNE ENTREPRISE`}</p>
            <p>
              {`Le portail de l'intelligence collective des agents publics`}
            </p>
          </div>
          <img className="header__fce" src={fceLogo} alt="logo_fce" />
        </div>
        {hasSharedButton && (
          <div className="column is-3 header__mailto">
            <a href="mailto:?subject=FCE - le portail de l'intelligence collective des agents publics&body=https://fce.fabrique.social.gouv.fr/">
              Partager FCE avec un agent
            </a>
          </div>
        )}
      </div>
      <div className="columns header is-hidden-desktop is-hidden-tablet-only">
        <div className="column header__mobile-content">
          <div>
            <Link to="/">
              <img
                className="header__marianne"
                src={marianneLogo}
                alt="marianne"
              />
            </Link>
          </div>
          <div className="header__text">
            <p>{`FICHE COMMUNE ENTREPRISE`}</p>
            <p>
              {`Le portail de l'intelligence collective des agents publics`}
            </p>
          </div>
          <div>
            <img src={fceLogo} alt="logo_fce" />
          </div>
        </div>
      </div>
    </>
  );
};

LandingHeader.propTypes = {
  hasSharedButton: PropTypes.bool
};

export default LandingHeader;
