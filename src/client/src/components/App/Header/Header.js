import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { resetSearch } from "../../../services/Store/actions";
import { faChevronLeft, faPlus } from "@fortawesome/pro-light-svg-icons";
import Button from "../../shared/Button";

import logo from "../../../assets/img/logo_gouv-65w38h.png";

const Header = ({ resetSearch, location, showBetaMessage }) => {
  return (
    <header className="app-header">
      <div className="container">
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
              <div className="header__title is-dark">
                Fiche Commune Entreprise
              </div>
            </Link>
            {(location.pathname.includes("/establishment") ||
              location.pathname.includes("/enterprise")) && (
              <div className="header__buttons">
                <div className="navbar-end is-flex">
                  <Link to="/">
                    <Button
                      value="Liste des résultats"
                      icon={faChevronLeft}
                      buttonClasses={["is-outlined"]}
                    />
                  </Link>
                  <Link
                    to="/"
                    onClick={() => {
                      resetSearch();
                    }}
                  >
                    <Button value="Nouvelle recherche" icon={faPlus} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {showBetaMessage && (
        <div className="beta-message flex-center">
          <div>
            <span>Ce site est en beta-test. </span>
            {location.pathname !== "/login" && (
              <span>
                Aidez-nous à l{"'"}améliorer en{" "}
                <a className="beta-message__feedback-link" href="#user-review">
                  donnant votre avis
                </a>
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    resetSearch: () => {
      dispatch(resetSearch());
    }
  };
};

Header.propTypes = {
  resetSearch: PropTypes.func,
  location: PropTypes.object,
  showBetaMessage: PropTypes.bool.isRequired
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
