import "../../components/Search/search.scss";

import React from "react";

import Config from "../../services/Config";

export default function LoginFailed() {
  return (
    <div className="app-search_">
      <div className="app-search__wrapper">
        <div className="container is-fullhd">
          <h3>Vous n’êtes pas autorisé(e) à accéder à FCE</h3>
          <p>
            Pouvez-vous s’il vous plait nous contacter sur{" "}
            <a
              className="is-link"
              href={`mailto:${Config.get("contact.mailto")}`}
            >
              bce@travail.gouv.fr
            </a>
            , afin que nous vous activions les accès ?
          </p>
          <a className="is-link" href="/">
            ← Retourner à FCE
          </a>
        </div>
      </div>
    </div>
  );
}
