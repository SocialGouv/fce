import React from "react";
import Value from "../../../elements/Value";

class Attestations extends React.Component {
  render() {
    const { enterprise } = this.props;

    return (
      <section id="attestations" className="enterprise-section">
        <h1 className="title h4">Attestations</h1>
        <dl className="dl row">
          <dt className="dt col-md-5">Attestation fiscale DGFIP</dt>
          <dd className="dd col-md-2">
            <Value
              value={!!enterprise.attestation_dgfip}
              empty="Non Disponible"
            />
          </dd>
          {enterprise.attestation_dgfip ? (
            <dd className="dd col-md-5">
              <a href={enterprise.attestation_dgfip} target="_blank">
                télécharger le document
              </a>
            </dd>
          ) : null}
        </dl>
        <dl className="dl row">
          <dt className="dt col-md-5">Attestation sociale ACOSS</dt>
          <dd className="dd col-md-2">
            <Value
              value={!!enterprise.attestation_acoss}
              empty="Non Disponible"
            />
          </dd>
          {enterprise.attestation_acoss ? (
            <dd className="dd col-md-5">
              <a href={enterprise.attestation_acoss} target="_blank">
                télécharger le document
              </a>
            </dd>
          ) : null}
        </dl>
      </section>
    );
  }
}

export default Attestations;
