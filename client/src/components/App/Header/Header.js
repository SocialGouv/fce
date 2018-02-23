import React from "react";
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
  NavLink,
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
          <Navbar color="primary" dark expand="md">
            <NavbarBrand href="/">Direccte</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">
                    Test
                  </NavLink>
                </NavItem>
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
