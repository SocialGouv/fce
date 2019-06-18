import React, { Component } from "react";
import mariane from "../../../assets/img/logo_gouv.png";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__gouv">
            <div className="footer__gouv-text">
              Un service fourni par l'incubateur des ministères sociaux
            </div>
            <img
              src={mariane}
              alt="Logo des institutions du gouvernement français"
              className="footer__gouv-logo"
            />
          </div>

          <div className="footer__links">
            <a
              className="footer__link"
              href="mailto:chloe.mandelblat@direccte.gouv.fr"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
