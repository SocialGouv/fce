import "./PortalClosureAlert.css";

import PropTypes from "prop-types";
import React, { useState } from "react";

export default function PortalClosureAlert({
  dismissible = true,
  defaultOpen = true,
}) {
  const [open, setOpen] = useState(defaultOpen);

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

      <p className="pca-title">
        <strong>
          Information importante : fermeture définitive du portail au 31 mars
          2026.
        </strong>
      </p>

      <p>
        Dans le cadre de la simplification des outils numériques de l’État et de
        la mutualisation des services, l’accès aux données relatives aux
        entreprises via le portail FCE ne sera plus proposé au 31 mars.
      </p>

      <p className="pca-signature">
        Merci de votre compréhension.
        <br />
        L’équipe FCE
      </p>
    </div>
  );
}

PortalClosureAlert.propTypes = {
  dismissible: PropTypes.bool,
  defaultOpen: PropTypes.bool,
};
