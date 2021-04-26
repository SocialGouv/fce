import React from "react";
import { Link } from "react-router-dom";
import Config from "../../../services/Config";
import mariane from "../../../assets/img/logo_gouv.png";
import "./footer.scss";

const Footer = () => (
  <footer className="footer">
    <div className="container is-fullhd">
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
          <li className="footer__link-item">
            <Link className="footer__link" to="/mentions-legales">
              Mentions légales
            </Link>
          </li>
          <li className="footer__link-item">
            <Link className="footer__link" to="/politique-de-confidentialite">
              Politique de confidentialité
            </Link>
          </li>
          <li className="footer__link-item">
            <Link className="footer__link" to="/sources-des-donnees">
              Sources des données
            </Link>
          </li>
          <li className="footer__link-item">
            <Link className="footer__link" to="/statistics">
              Statistiques
            </Link>
          </li>
          <li className="footer__link-item">
            Contact :{" "}
            <a href={`mailto:${Config.get("contact.mailto")}`}>
              {Config.get("contact.mailto")}
            </a>
          </li>
          <li className="footer__link-item">
            <Link className="footer__link" to="/faq">
              FAQ
            </Link>
          </li>
          <li className="footer__link-item">
            <Link className="footer__link" to="/a-propos">
              A propos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
