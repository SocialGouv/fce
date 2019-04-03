import React from "react";
import Value from "../../../elements/Value";

class Attestations extends React.Component {
  render() {
    const { enterprise } = this.props;

    return (
      <section id="attestations" className="enterprise-section">
        <h1 className="title h4">Attestations</h1>
        <div className="columns">
          <h5 className="column is-3">Attestation fiscale DGFIP</h5>
          <span className="column is-8">
            <Value
              value={!!enterprise.attestation_dgfip}
              empty="Non Disponible"
              no="Non Disponible"
            />
          </span>
          {enterprise.attestation_dgfip ? (
            <span className="span col-md-5">
              <a
                href={enterprise.attestation_dgfip}
                target="_blank"
                rel="noopener noreferrer"
              >
                télécharger le document
              </a>
            </span>
          ) : null}
        </div>
        <div className="columns">
          <h5 className="column is-3">Attestation sociale ACOSS</h5>
          <span className="column is-8">
            <Value
              value={!!enterprise.attestation_acoss}
              empty="Non Disponible"
              no="Non Disponible"
            />
          </span>
          {enterprise.attestation_acoss ? (
            <span className="span col-md-5">
              <a
                href={enterprise.attestation_acoss}
                target="_blank"
                rel="noopener noreferrer"
              >
                télécharger le document
              </a>
            </span>
          ) : null}
        </div>
      </section>
    );
  }
}

export default Attestations;
