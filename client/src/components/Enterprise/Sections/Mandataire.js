import React from "react";
import Value from "../../../elements/Value";

class Mandataire extends React.Component {
  render() {
    const { mandataire } = this.props;

    return (
      <div>
        <dl className="dl row">
          {mandataire.raison_sociale
            ? [
                <dt className="dt col-md-4">Raison Sociale</dt>,
                <dd className="dd col-md-8">
                  <Value value={mandataire.raison_sociale} empty="-" />
                </dd>
              ]
            : [
                <dt className="dt col-md-4">Nom</dt>,
                <dd className="dd col-md-8">
                  <Value value={mandataire.nom} empty="-" />
                </dd>,
                <dt className="dt col-md-4">Prenom</dt>,
                <dd className="dd col-md-8">
                  <Value value={mandataire.prenom} empty="-" />
                </dd>
              ]}

          <dt className="dt col-md-4">Fonction</dt>
          <dd className="dd col-md-8">
            <Value value={mandataire.fonction} empty="-" />
          </dd>
        </dl>
      </div>
    );
  }
}

export default Mandataire;
