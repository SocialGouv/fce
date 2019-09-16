import React from "react";

import Config from "../../../services/Config";
import mariane from "../../../assets/img/logo_gouv.png";

const Footer = () => (
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

      <div>
        <ul className="footer__links">
          <li className="footer__linkItem">
            <a className="footer__link" href="mentions-legales">
              Mentions légales
            </a>
          </li>
          <li className="footer__linkItem">
            <a className="footer__link" href="cgu">
              CGU
            </a>
          </li>
          <li className="footer__linkItem">
            <a
              className="footer__link"
              href={`mailto:${Config.get("contact.mailto")}`}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
