import "./header.scss";

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import LogoFCE from "../../../assets/img/FCE.svg";
import Logo from "../../../assets/img/GouvernementSVG.svg";
import { resetSearch } from "../../../services/Store/actions";
import HeaderLogo from "../Logo/Logo.jsx";

const Header = ({ resetSearch }) => {
  return (
    <header className="app-header ">
      <div className="container is-fluid ">
        <nav className="navbar">
          <div className="header__items is-tablet ">
            <Link
              className="header__home-link"
              to="/"
              onClick={() => {
                resetSearch();
              }}
            >
              <div className="header__logo_FCE">
                <div className="header__logo_FCE-repub">
                  <HeaderLogo
                    title="république française"
                    className="header__logo_marianne"
                    width={140}
                    height={54}
                    logo={Logo}
                  />
                </div>
                <HeaderLogo
                  title="Logo de la Fiche Commune Entreprise"
                  className="header__logo_marianne logo_FCE left"
                  width={53.83}
                  height={48}
                  logo={LogoFCE}
                />
                <div className="header__titles">
                  <div className="header__title">Fiche Commune Entreprise</div>
                  <div className="header__sub_title">
                    Le portail de l’intelligence collective des agents publics
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </nav>
      </div>

      {/* 
      {showBetaMessage && (
        <div className="beta-message">
          <div>
            <span>Ce site est en beta-test. </span>
            {location.pathname !== "/login" && (
              <span>
                Aidez-nous à l{"'"}améliorer en{" "}
                <a
                  className="beta-message__feedback-link"
                  href="#user-feedback"
                >
                  donnant votre avis
                </a>
              </span>
            )}
          </div>
        </div>
      )} */}
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetSearch: () => {
      dispatch(resetSearch());
    },
  };
};

Header.propTypes = {
  location: PropTypes.object,
  resetSearch: PropTypes.func,
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
