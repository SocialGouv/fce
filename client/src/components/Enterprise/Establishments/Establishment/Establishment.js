import React from "react";
import { Link } from "react-router-dom";
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
          <Link to={`/establishment/${establishment.siret}`}>
            <Value value={establishment.siret} empty="" />
          </Link>
        </li>
        <li>
          <Value value={establishment.etat_etablissement} empty="" /> -{" "}
          <Value value={establishment.departement} empty="" /> -{" "}
          <Value
            value={establishment.adresse && establishment.adresse.localite}
            empty=""
          />{" "}
          - Effectif :{" "}
          <Value value={establishment.dernier_effectif__physique} empty="-" />
        </li>
      </ul>
    );
  }
}

export default Establishment;
