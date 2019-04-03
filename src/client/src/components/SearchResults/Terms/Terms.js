import React from "react";

class Terms extends React.Component {
  render() {
    return (
      <div className="terms-list box columns">
        <div className="column is-6">
          <div className="columns">
            <h5 className="column is-6">Raison Sociale / Nom</h5>
            <span className="column is-6">
              {this.props.terms.raisonSociale}
            </span>
          </div>
          <div className="columns">
            <h5 className="column is-6">SIREN</h5>
            <span className="column is-6">{this.props.terms.siren}</span>
          </div>
          <div className="columns">
            <h5 className="column is-6">Code NAF</h5>
            <span className="column is-6">{this.props.terms.naf}</span>
          </div>
          <div className="columns">
            <h5 className="column is-6">Commune</h5>
            <span className="column is-6">{this.props.terms.commune}</span>
          </div>
        </div>
        <div className="column is-6">
          <div className="columns">
            <h5 className="column is-7">Code Postal</h5>
            <span className="column is-5">{this.props.terms.codePostal}</span>
          </div>
          <div className="columns">
            <h5 className="column is-7">Département</h5>
            <span className="column is-5">{this.props.terms.departement}</span>
          </div>
          <div className="columns">
            <h5 className="column is-7">Interactions</h5>
            <span className="column is-5">
              {this.props.terms.interactions &&
              this.props.terms.interactions.length
                ? this.props.terms.interactions
                    .map(interaction => interaction.label)
                    .join(", ")
                : ""}
            </span>
          </div>
          <div className="columns">
            <h5 className="column is-7">
              Etablissements principaux uniquement ?
            </h5>
            <span className="column is-5">
              {this.props.terms.siegeSocial ? "oui" : "non"}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Terms;
