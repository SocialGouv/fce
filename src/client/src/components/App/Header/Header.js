import "./header.scss";

import PropTypes from "prop-types";
import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import LogoFCE from "../../../assets/img/FCE.svg";
import Logo from "../../../assets/img/Footer_Logo.svg";
import Auth from "../../../services/Auth/index.js";
import Config from "../../../services/Config/Config.js";
import { resetSearch } from "../../../services/Store/actions";
import { UserContext } from "../../Login/UserContext.js";
import ArrowDown from "../../shared/Icons/ArrowDown.jsx";
import MessageIcon from "../../shared/Icons/MessageIcon.jsx";
import Tooltip from "../../shared/Tooltip/Tooltip.jsx";
import HeaderLogo from "../Logo/Logo.jsx";

const Header = ({ resetSearch, hasSharedButton = false }) => {
  const { user, logout } = useContext(UserContext);
  const { pathname } = useLocation();

  const isProConnectLoginPage = pathname === "/login-proconnect";

  const auth = Auth.isLogged();
  const handleLogoutClick = (event) => {
    event.stopPropagation();
    logout();
  };
  const SERVER_URL = Config.get("api_endpoint");
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
                    width={200}
                    height={70}
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

            {
              <div className="header__mailto">
                {!auth && !user && isProConnectLoginPage && (
                  <div className="header__proConnect">
                    <a
                      href={`${SERVER_URL}/auth/proconnect`}
                      className="proconnect-button"
                    >
                      <span className="proconnect-sr-only">
                        S’identifier avec ProConnect
                      </span>
                    </a>
                    <p>
                      <a
                        href="https://www.proconnect.gouv.fr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Qu’est-ce que ProConnect ? - nouvelle fenêtre"
                      >
                        Qu’est-ce que ProConnect ?
                      </a>
                    </p>
                  </div>
                )}
                {!auth && user && (
                  <div className="logout-btn-div">
                    <div className=" dropdown is-hoverable">
                      <div className="dropdown-trigger">
                        <button
                          className="button logout-btn-div-dropdown"
                          aria-haspopup="true"
                          aria-controls="dropdown-menu3"
                        >
                          <span className="is-link ">{user?.email}</span>

                          <span>
                            <ArrowDown size={18} color="#161616" />
                          </span>
                        </button>
                      </div>
                      <div
                        className="dropdown-menu"
                        id="dropdown-menu3"
                        role="menu"
                      >
                        <div className="dropdown-content">
                          <a href="/compte" className="dropdown-item">
                            Compte
                          </a>

                          <hr className="dropdown-divider" />
                          <button
                            className="dropdown-item dropdown-item-btn"
                            onClick={handleLogoutClick}
                          >
                            Se déconnecter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {!hasSharedButton && (
                  <Tooltip
                    content="Partager FCE avec un agent"
                    position={"left"}
                  >
                    <div className="icon-button-link">
                      <a href="mailto:?subject=FCE - le portail de l'intelligence collective des agents publics&body=https://fce.fabrique.social.gouv.fr/">
                        <MessageIcon />
                      </a>
                    </div>
                  </Tooltip>
                )}
              </div>
            }
          </div>
        </nav>
      </div>
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
  hasSharedButton: PropTypes.bool,
  location: PropTypes.object,
  resetSearch: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Header);
