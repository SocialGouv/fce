import React from "react";

class Terms extends React.Component {
  render() {
    return (
      <dl className="terms-list row bg-info text-white">
        <dt className="col-md-4">Raison Sociale / Nom</dt>
        <dd className="definition col-md-8">
          {this.props.terms.raisonSociale}
        </dd>

        <dt className="col-md-4">SIREN</dt>
        <dd className="definition col-md-8">{this.props.terms.siren}</dd>

        <dt className="col-md-4">Code NAF</dt>
        <dd className="definition col-md-8">{this.props.terms.naf}</dd>

        <dt className="col-md-4">Commune</dt>
        <dd className="definition col-md-8">{this.props.terms.commune}</dd>

        <dt className="col-md-4">Code Postal</dt>
        <dd className="definition col-md-8">{this.props.terms.codePostal}</dd>

        <dt className="col-md-4">Département</dt>
        <dd className="definition col-md-8">{this.props.terms.departement}</dd>

        <dt className="col-md-4">Interactions</dt>
        <dd className="definition col-md-8">
          {this.props.terms.interactions && this.props.terms.interactions.length
            ? this.props.terms.interactions
                .map(interaction => interaction.label)
                .join(", ")
            : ""}
        </dd>

        <dt className="col-md-4">Etablissements principaux uniquement ?</dt>
        <dd className="definition col-md-8">
          {this.props.terms.siegeSocial ? "oui" : "non"}
        </dd>

        <dt className="col-md-4">Nombre de résultats</dt>
        <dd className="definition col-md-8">{this.props.nbResults}</dd>
      </dl>
    );
  }
}

export default Terms;
