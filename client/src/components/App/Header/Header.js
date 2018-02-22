import React, { Component } from "react";
import { IfLoggedIn } from "../../../helpers/Auth";

import "./header.css";
import Footer from "../Footer/Footer";

class Header extends Component {
  render() {
    return (
      <IfLoggedIn>
        <header className="app-header">header logged</header>
      </IfLoggedIn>
    );
  }
}

export default Header;
