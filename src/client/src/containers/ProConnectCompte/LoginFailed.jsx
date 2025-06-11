import "../../components/Search/search.scss";

import React from "react";

import Config from "../../services/Config";

export default function LoginFailed() {
  return (
    <div className="app-search_cnx_requise">
      <div className="app-search__wrapper">
        <div className="container is-fullhd">
          <strong> Accès non autorisé</strong>
          <p>
            {" "}
            Accès non autorisé Ce portail est réservé aux agents des
            <strong> DREETS, DDETS(PP)</strong> et <strong>DDPP.</strong>
          </p>
          <div>Votre profil ne vous permet pas d’y accéder.</div>
          <div>
            Pour toute question, vous pouvez contacter l’équipe FCE/BCE à
            l’adresse suivante :{" "}
            <a
              className="is-link"
              href={`mailto:${Config.get("contact.mailto")}`}
            >
              bce@travail.gouv.fr
            </a>
            , afin que nous vous activions les accès ?
          </div>
        </div>
      </div>
    </div>
  );
}
