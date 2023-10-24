import "./header.scss";

import {
  faChevronLeft,
  faInfoCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import logo from "../../../assets/img/logo_gouv-65w38h.png";
import Config from "../../../services/Config";
import { resetSearch } from "../../../services/Store/actions";

const Header = ({ resetSearch, location, showBetaMessage }) => {
  return (
    <header className="app-header">
      <div className="container is-fullhd">
        <nav>
          <div className="header__items is-tablet">
            <Link
              className="header__home-link"
              to="/"
              onClick={() => {
                resetSearch();
              }}
            >
              <img className="header__logo" src={logo} alt="Logo Marianne" />
              <div className="header__title">Fiche Commune Entreprise</div>
            </Link>
            {(location.pathname.includes("/establishment") ||
              location.pathname.includes("/enterprise")) && (
              <div className="header__buttons">
                <div className="navbar-end is-flex">
                  <Link to="/search" className="button">
                    <span className="button-icon">
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span>Liste des résultats</span>
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      resetSearch();
                    }}
                    className="button"
                  >
                    <span className="button-icon">
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span>Nouvelle recherche</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {showBetaMessage && (
        <div className="beta-message">
          <div>
            <span className="beta-message__nouveaute">
              {" "}
              <FontAwesomeIcon icon={faInfoCircle} /> Nouvelle version de notre
              portail FCE sera déployée le 15 novembre 2023 :{" "}
            </span>
            {location.pathname !== "/login" && (
              <span>
                {`Cette mise à jour est une refonte ergonomique visant à aligner notre site avec la charte de l'État.
                  Nous tenons à souligner que cette mise à jour n'affectera en rien le contenu actuel de notre portail,
                  qui restera inchangé. Vous continuerez d'accéder à toutes les informations et fonctionnalités auxquelles
                   vous êtes habitués. `}
                <br />
                <span>
                  Questions ou préoccupations ➜
                  <a
                    className="beta-message__feedback-link"
                    href={`mailto:${Config.get("contact.mailto")}`}
                  >
                    bce@travail.gouv.fr
                  </a>
                </span>
              </span>
            )}
          </div>
        </div>
      )}
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
  showBetaMessage: PropTypes.bool.isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
