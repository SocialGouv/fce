import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        <img
          src="/img/la_direccte.png"
          alt="La DIRECCTE Occitanie"
          className="img-direccte"
        />
        <img src="/img/labo.png" alt="Le labO" className="img-labo" />
      </footer>
    );
  }
}

export default Footer;
