import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Value from "../../../shared/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle, faSquare } from "@fortawesome/fontawesome-pro-solid";
import { isActiveEstablishment } from "../../../../helpers/Establishment";

class Establishment extends React.Component {
  render() {
    const { establishment } = this.props;
    const isActive = isActiveEstablishment(establishment);
    const stateClass = isActive ? "icon--success" : "icon--danger";

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
          <Value
            value={
              establishment.departement ||
              (establishment.adresse_components &&
                establishment.adresse_components.code_postal.slice(0, 2)) ||
              ""
            }
            empty=""
          />{" "}
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
