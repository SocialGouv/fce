import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logoutUser } from "../../../services/Store/actions";

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
          <div className="navbar-brand">
            <a href="/" className="navbar-item">
              FCE | Direccte
            </a>
          </div>
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

          <div className="navbar-menu" id="navbarMenu">
            <div className="navbar-start">
              <Link
                to="/search"
                className="navbar-item"
                title="Rechercher un établissement ou une entreprise"
              >
                Recherche simple
              </Link>
              <Link
                to="/search/advanced"
                className="navbar-item"
                title="Rechercher une liste d'établissements"
              >
                Recherche avancée
              </Link>
              {this.props.user && this.props.user.isAdmin ? (
                <Link to="/admin" className="navbar-item">
                  Admin
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
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
