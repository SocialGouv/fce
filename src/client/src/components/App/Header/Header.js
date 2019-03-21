import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logoutUser } from "../../../services/Store/actions";

import logo from "../../../assets/img/logo_gouv.png";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <header className="app-header">
        <nav className="navbar">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo Marianne" /> Fiche Commune Entreprise
          </Link>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>

          {/* <div className="navbar-menu" id="navbarMenu">
            <div className="navbar-start">
              <Link
                to="/search"
                className="navbar-item"
                title="Rechercher un établissement ou une entreprise"
              >
                Recherche
              </Link>
            </div>
          </div> */}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
