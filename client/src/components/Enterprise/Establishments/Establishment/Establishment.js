import React from "react";

class Establishment extends React.Component {
  render() {
    return (
      <ul className="list-unstyled">
        <li>[name]</li>
        <li>[SIRET]</li>
        <li>[Actif] - [DEP] - [VILLE] - Éffectif : [NB]</li>
      </ul>
    );
  }
}

export default Establishment;
