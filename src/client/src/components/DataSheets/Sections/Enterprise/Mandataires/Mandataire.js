import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";

const Mandataire = ({ mandataire }) => {
  return (
    <div className="mandataire">
      <div className="columns">
        <h5 className="column is-3">Fonction</h5>
        <span className="column is-8">
          <Value value={mandataire.fonction} empty="-" />
        </span>
      </div>
      {mandataire.raison_sociale ? (
        <div className="columns">
          <h5 className="column is-3">Raison Sociale</h5>
          <span className="column is-8">
            <Value value={mandataire.raison_sociale} empty="-" />
          </span>
        </div>
      ) : (
        <div className="columns">
          <h5 className="column is-3">Nom et Prénom</h5>
          <span className="column is-8">
            <Value value={`${mandataire.nom} ${mandataire.prenom}`} empty="-" />
          </span>
        </div>
      )}
    </div>
  );
};

Mandataire.propTypes = {
  mandataire: PropTypes.object.isRequired
};

export default Mandataire;
