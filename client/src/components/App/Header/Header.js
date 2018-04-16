import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { IfLoggedIn } from "../../../helpers/Auth";
import { logoutUser } from "../../../services/Store/actions";

import "./header.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  Button
} from "reactstrap";

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
      <IfLoggedIn>
        <header className="app-header">
          <Navbar
            className="gradient-color-direccte"
            dark
            fixed="top"
            expand="md"
          >
            <NavbarBrand href="/">FCE | Direccte</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link
                    to="/search"
                    className="nav-link"
                    title="Rechercher un établissement ou une entreprise"
                  >
                    Recherche
                  </Link>
                </NavItem>

                <NavItem>
                  <Link
                    to="/search/advanced"
                    className="nav-link"
                    title="Rechercher une liste d'établissements"
                  >
                    Recherche avancée
                  </Link>
                </NavItem>

                {this.props.user && this.props.user.isAdmin ? (
                  <NavItem>
                    <Link to="/admin" className="nav-link">
                      Admin
                    </Link>
                  </NavItem>
                ) : (
                  ""
                )}
              </Nav>

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Form inline onSubmit={this.props.logoutUser}>
                    <Button color="danger">Se déconnecter</Button>
                  </Form>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </header>
      </IfLoggedIn>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
