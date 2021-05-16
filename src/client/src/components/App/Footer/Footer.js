import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Config from "../../../services/Config";
import mariane from "../../../assets/img/logo_gouv.png";
import "./footer.scss";

const Footer = () => {
  const [communicationKitLink, setCommunicationKitLink] = useState(null);

  useEffect(() => {
    const fetchCommunicationKitUrl = () => {
      fetch(`${Config.get("strapi.domain")}/kit-de-communication`)
        .then(res => res.json())
        .then(data => {
          setCommunicationKitLink(data);
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    fetchCommunicationKitUrl();
  }, []);

  return (
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

        <div className="footer__links">
          <ul className="footer__links-row">
            <li className="footer__links-item">
              <Link className="footer__link" to="/a-propos">
                A propos
              </Link>
            </li>
            <li className="footer__links-item">
              <Link className="footer__link" to="/faq">
                FAQ
              </Link>
            </li>
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
      </div>
    </footer>
  );
};

export default Footer;
