import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { resetSearch } from "../../../services/Store/actions";
import { faChevronLeft, faPlus } from "@fortawesome/fontawesome-pro-light";
import Button from "../../shared/Button";

import logo from "../../../assets/img/logo_gouv-65w38h.png";

const Header = ({ resetSearch, location }) => {
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
                    <Button
                      value="Nouvelle recherche"
                      icon={faPlus}
                      buttonClasses={["is-secondary"]}
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
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
  location: PropTypes.object
};

export default withRouter(connect(mapDispatchToProps)(Header));
