import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Value from "../../../shared/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle, faSquare } from "@fortawesome/fontawesome-pro-solid";
import { isActiveEstablishment } from "../../../../helpers/Establishment";

import "./establishment.scss";

const Establishment = ({ establishment }) => {
  const isActive = isActiveEstablishment(establishment);
  const stateClass = isActive ? "icon--success" : "icon--danger";

  return (
    <section>
      <div className="establishment__siret">
        <FontAwesomeIcon
          className={classNames("establishment__state-icon", stateClass)}
          icon={isActive ? faCircle : faSquare}
        />
        <Link
          to={`/establishment/${establishment.siret}`}
          className="establishment__siret"
        >
          <Value value={establishment.siret} empty="" />
        </Link>
      </div>
      <div className="establishment__location">
        <Value
          value={
            establishment.departement ||
            (establishment.adresse_components &&
              establishment.adresse_components.code_postal &&
              establishment.adresse_components.code_postal.slice(0, 2)) ||
            ""
          }
          empty=""
        />
        {" - "}
        <Value
          value={
            establishment.adresse_components &&
            establishment.adresse_components.localite
          }
          empty=""
        />
      </div>
    </section>
  );
};

Establishment.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default Establishment;
