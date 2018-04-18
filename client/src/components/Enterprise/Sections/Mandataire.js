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
                <dt className="dt col-md-4" key="rs_label">
                  Raison Sociale
                </dt>,
                <dd className="dd col-md-8" key="rs_value">
                  <Value value={mandataire.raison_sociale} empty="-" />
                </dd>
              ]
            : [
                <dt className="dt col-md-4" key="name_label">
                  Nom
                </dt>,
                <dd className="dd col-md-8" key="name_value">
                  <Value value={mandataire.nom} empty="-" />
                </dd>,
                <dt className="dt col-md-4" key="firstname_label">
                  Prenom
                </dt>,
                <dd className="dd col-md-8" key="firstname_value">
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
