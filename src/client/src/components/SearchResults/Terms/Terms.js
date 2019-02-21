import React from "react";

class Terms extends React.Component {
  render() {
    return (
      <div className="terms-list box columns">
        <div className="column is-6">
          <div className="columns">
            <h5 className="column is-3">Raison Sociale / Nom</h5>
            <span className="column is-8">
              {this.props.terms.raisonSociale}
            </span>
          </div>
          <div className="columns">
            <h5 className="column is-3">SIREN</h5>
            <span className="column is-8">{this.props.terms.siren}</span>
          </div>
          <div className="columns">
            <h5 className="column is-3">Code NAF</h5>
            <span className="column is-8">{this.props.terms.naf}</span>
          </div>
          <div className="columns">
            <h5 className="column is-3">Commune</h5>
            <span className="column is-8">{this.props.terms.commune}</span>
          </div>
        </div>
        <div className="column is-6">
          <div className="columns">
            <h5 className="column is-3">Code Postal</h5>
            <span className="column is-8">{this.props.terms.codePostal}</span>
          </div>
          <div className="columns">
            <h5 className="column is-3">Département</h5>
            <span className="column is-8">{this.props.terms.departement}</span>
          </div>
          <div className="columns">
            <h5 className="column is-3">Interactions</h5>
            <span className="column is-8">
              {this.props.terms.interactions &&
              this.props.terms.interactions.length
                ? this.props.terms.interactions
                    .map(interaction => interaction.label)
                    .join(", ")
                : ""}
            </span>
          </div>
          <div className="columns">
            <h5 className="column is-3">
              Etablissements principaux uniquement ?
            </h5>
            <span className="column is-8">
              {this.props.terms.siegeSocial ? "oui" : "non"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Terms;
