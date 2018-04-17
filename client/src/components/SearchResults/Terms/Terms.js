import React from "react";

class Terms extends React.Component {
  render() {
    return (
      <dl className="terms-list row bg-info text-white">
        <dt className="col-md-3">Raison Sociale</dt>
        <dd className="definition col-md-9">
          {this.props.terms.raisonSociale}
        </dd>

        <dt className="col-md-3">SIREN</dt>
        <dd className="definition col-md-9">{this.props.terms.siren}</dd>

        <dt className="col-md-3">Code NAF</dt>
        <dd className="definition col-md-9">{this.props.terms.naf}</dd>

        <dt className="col-md-3">Commune</dt>
        <dd className="definition col-md-9">{this.props.terms.commune}</dd>

        <dt className="col-md-3">Code Postal</dt>
        <dd className="definition col-md-9">{this.props.terms.codePostal}</dd>

        <dt className="col-md-3">Département</dt>
        <dd className="definition col-md-9">{this.props.terms.departement}</dd>

        <dt className="col-md-3">Interactions</dt>
        <dd className="definition col-md-9">
          {this.props.terms.interactions && this.props.terms.interactions.length
            ? this.props.terms.interactions
                .map(interaction => interaction.label)
                .join(", ")
            : ""}
        </dd>
      </dl>
    );
  }
}

export default Terms;
