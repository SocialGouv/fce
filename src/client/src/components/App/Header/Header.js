import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { logoutUser, resetSearch } from "../../../services/Store/actions";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-pro-solid";

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

  newSearch = event => {
    this.props.resetSearch();
  };

  render() {
    return (
      <header className="app-header">
        <nav className="navbar">
          <Link to="/" onClick={this.newSearch} className="navbar-brand">
            <img src={logo} alt="Logo Marianne" /> Fiche Commune Entreprise
          </Link>
          <Link to="/" onClick={this.newSearch} className="navbar-brand">
            <FontAwesomeIcon icon={faSearch} /> Nouvelle recherche
          </Link>
          <div
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarMenu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
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
    },
    resetSearch: () => {
      dispatch(resetSearch());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
