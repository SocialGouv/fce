import "./PortalClosureAlert.css";

import PropTypes from "prop-types";
import React, { useState } from "react";

export default function PortalClosureAlert({
  dismissible = true,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [expanded, setExpanded] = useState(false);

  if (!open) return null;

  return (
    <div className="pca-alert" role="alert" aria-live="polite">
      {dismissible && (
        <button
          type="button"
          className="pca-close"
          aria-label="Fermer l’alerte"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
      )}

      <div
        className={`pca-content ${expanded ? "is-expanded" : "is-collapsed"}`}
      >
        <p className="pca-title">
          <strong>
            Information importante : report de la fermeture du portail FCE
          </strong>
        </p>

        <p>
          Suite à vos retours, la fermeture du portail Fiche Commune Entreprise
          (FCE), initialement prévue au 31 mars 2026, est reportée de deux mois.
        </p>

        <p>
          Cette période vise à organiser la transition : seule une partie des
          données sera accessible via l’Espace Agent de l’Annuaire des
          Entreprises, tandis que d’autres feront l’objet de modalités de
          diffusion distinctes.
        </p>

        <p>Une coordination est en cours afin d’accompagner cette évolution.</p>

        <p>
          <strong>Important :</strong> dans l’attente de cette transition, nous
          vous recommandons vivement d’utiliser le bouton ProConnect (en haut à
          droite du portail) pour vous authentifier sur le portail FCE. La
          création de nouveaux comptes FCE n’est désormais plus possible.
        </p>

        <p className="pca-signature">
          Merci de votre compréhension,
          <br />
          L’équipe FCE
        </p>
      </div>

      <button
        type="button"
        className="pca-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? "Voir moins" : "Voir plus"}
      </button>
    </div>
  );
}

PortalClosureAlert.propTypes = {
  defaultOpen: PropTypes.bool,
  dismissible: PropTypes.bool,
};
