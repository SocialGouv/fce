import React from "react";
import Value from "../../../elements/Value";

class Mandataire extends React.Component {
  render() {
    const { mandataire } = this.props;

    return (
      <>
        {mandataire.raison_sociale
          ? [
              <div className="columns">
                <h5 className="column is-3" key="rs_label">
                  Raison Sociale
                </h5>
                <span className="column is-8" key="rs_value">
                  <Value value={mandataire.raison_sociale} empty="-" />
                </span>
              </div>
            ]
          : [
              <div className="columns">
                <h5 className="column is-3" key="name_label">
                  Nom
                </h5>
                <span className="column is-8" key="name_value">
                  <Value value={mandataire.nom} empty="-" />
                </span>
              </div>,
              <div className="columns">
                <h5 className="column is-3" key="firstname_label">
                  Prenom
                </h5>
                <span className="column is-8" key="firstname_value">
                  <Value value={mandataire.prenom} empty="-" />
                </span>
              </div>
            ]}
        <div className="columns">
          <h5 className="column is-3">Fonction</h5>
          <span className="column is-8">
            <Value value={mandataire.fonction} empty="-" />
          </span>
        </div>
      </>
    );
  }
}

export default Mandataire;
