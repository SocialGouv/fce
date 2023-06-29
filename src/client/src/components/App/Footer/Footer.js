import "./footer.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/img/Footer_Logo.svg";
import Config from "../../../services/Config";
import HeaderLogo from "../Logo/Logo.jsx";

const Footer = () => {
  const [communicationKitLink, setCommunicationKitLink] = useState(null);

  useEffect(() => {
    const fetchCommunicationKitUrl = () => {
      fetch(`${Config.get("strapi.domain")}/kit-de-communication`)
        .then((res) => res.json())
        .then((data) => {
          setCommunicationKitLink(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCommunicationKitUrl();
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container is-fluid">
          <div className="footer__gouv">
            <HeaderLogo
              title="république française"
              className="header__logo_marianne"
              width={290}
              height={130}
              logo={Logo}
            />
          </div>
        </div>
      </footer>
      <footer className="footer second-footer">
        <div className="footer__links">
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/a-propos">
                A propos
              </Link>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/faq">
                FAQ
              </Link>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/aide">
                Aide
              </Link>
            </li>
          </ul>

          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/sources-des-donnees">
                Sources des données
              </Link>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/statistics">
                Statistiques
              </Link>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/mentions-legales">
                Mentions légales
              </Link>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/politique-de-confidentialite">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              Contact :{" "}
              <a href={`mailto:${Config.get("contact.mailto")}`}>
                {Config.get("contact.mailto")}
              </a>
            </li>
          </ul>
          <ul className="footer__links-row">
            <li className="footer__links-item">
              {communicationKitLink?.lien ? (
                <a
                  href={communicationKitLink.lien}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Télécharger le kit de communication
                </a>
              ) : (
                "Télécharger le kit de communication"
              )}
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
