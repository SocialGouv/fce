import React from "react";

class Terms extends React.Component {
  render() {
    return (
      <dl className="row">
        <dt className="col-md-3">Raison Sociale</dt>
        <dd className="col-md-9">{this.props.terms.raisonSociale}</dd>
      </dl>
    );
  }
}

export default Terms;
