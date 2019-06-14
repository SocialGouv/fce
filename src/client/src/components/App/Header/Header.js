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
          <nav>
            <div className="header__items">
              <Link
                className="header__home-link"
                to="/"
                onClick={this.newSearch}
              >
                <img className="header__logo" src={logo} alt="Logo Marianne" />
                <div className="header__title is-dark">
                  Fiche Commune Entreprise
                </div>
              </Link>
            </div>
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
