import React from "react";
import { Link } from "react-router-dom";
import Config from "../../../services/Config";
import mariane from "../../../assets/img/logo_gouv.png";
import "./footer.scss";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer__gouv">
        <div className="footer__gouv-text">
          Un service fourni par l{"'"}incubateur des ministères sociaux
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
            <Link className="footer__link" to="mentions-legales">
              Mentions légales
            </Link>
          </li>
          <li className="footer__linkItem">
            <Link className="footer__link" to="cgu">
              CGU
            </Link>
          </li>
          <li className="footer__linkItem">
            <Link
              className="footer__link"
              to={`mailto:${Config.get("contact.mailto")}`}
            >
              Contact
            </Link>
          </li>
          <li className="footer__linkItem">
            <Link className="footer__link" to="about">
              A propos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
