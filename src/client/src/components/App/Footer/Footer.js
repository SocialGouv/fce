import React, { Component } from "react";

import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <img
          src="/img/la_direccte.png"
          alt="La DIRECCTE Occitanie"
          className="float-left img-direccte"
        />
        <img
          src="/img/labo.png"
          alt="Le labO"
          className="float-right img-labo"
        />
      </footer>
    );
  }
}

export default Footer;
