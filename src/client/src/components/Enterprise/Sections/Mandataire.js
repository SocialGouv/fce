import React from "react";
import Value from "../../../elements/Value";

class Mandataire extends React.Component {
  render() {
    const { mandataire } = this.props;

    return (
      <div className="mandataire">
        <div className="columns">
          <h5 className="column is-3">Fonction</h5>
          <span className="column is-8">
            <Value value={mandataire.fonction} empty="-" />
          </span>
        </div>
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
              <div className="columns" key="name_container">
                <h5 className="column is-3" key="name_label">
                  Nom et Prénom
                </h5>
                <span className="column is-8" key="name_value">
                  <Value
                    value={`${mandataire.nom} ${mandataire.prenom}`}
                    empty="-"
                  />
                </span>
              </div>
            ]}
      </div>
    );
  }
}

export default Mandataire;
