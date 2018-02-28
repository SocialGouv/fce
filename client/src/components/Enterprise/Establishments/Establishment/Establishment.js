import React from "react";
import Value from "../../../../elements/Value";

class Establishment extends React.Component {
  render() {
    const { establishment } = this.props;

    return (
      <ul className="list-unstyled">
        <li>
          <Value value={establishment.enseigne} empty="" />
        </li>
        <li>
          <Value value={establishment.siret} empty="" />
        </li>
        <li>
          <Value value={establishment.etat_etablissement} empty="" /> -{" "}
          <Value value={establishment.departement} empty="" /> -{" "}
          <Value value={establishment.adresse.localite} empty="" /> - Effectif :{" "}
          <Value value={establishment.dernier_effectif__physique} empty="-" />
        </li>
      </ul>
    );
  }
}

export default Establishment;
