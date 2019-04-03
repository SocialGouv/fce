import React, { Component } from "react";
import PaperBG from "../../../assets/img/paper.png";

const footerStyle = {
  background: `url(${PaperBG})`
};

class Footer extends Component {
  render() {
    return (
      <footer className="app-footer" style={footerStyle}>
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
