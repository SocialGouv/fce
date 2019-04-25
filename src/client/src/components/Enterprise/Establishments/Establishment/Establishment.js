import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Value from "../../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/fontawesome-pro-solid";

class Establishment extends React.Component {
  render() {
    const { establishment } = this.props;
    const nbInteractions = Array.isArray(establishment.direccte)
      ? establishment.direccte.length
      : 0;

    const stateClass =
      establishment.etat_etablissement === "A"
        ? "icon--success"
        : "icon--danger";

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
          <FontAwesomeIcon className={classNames(stateClass)} icon={faCircle} />
          <span> - </span>
          <Value
            value={
              (establishment.departement &&
                establishment.adresse_components &&
                establishment.adresse_components.code_postal.slice(0, 2)) ||
              null
            }
            empty=""
          />
          <span> - </span>
          <Value
            value={
              establishment.adresse_components &&
              establishment.adresse_components.localite
            }
            empty=""
          />
        </li>
      </ul>
    );
  }
}

export default Establishment;
