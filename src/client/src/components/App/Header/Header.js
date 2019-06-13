import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { resetSearch } from "../../../services/Store/actions";

import logo from "../../../assets/img/logo_gouv-65w38h.png";

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
      <header className="app-header section">
        <div className="container">
          <nav className="navbar">
            <div className="navbar-start">
              <Link to="/" onClick={this.newSearch} className="navbar-brand">
                <img src={logo} alt="Logo Marianne" /> Fiche Commune Entreprise
              </Link>
            </div>
            <div className="navbar-end is-flex" />
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
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
