import "./establishment.scss";

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { formatSiret } from "../../../../helpers/utils";
import {
  getCity,
  getCodePostal,
  getState,
} from "../../../../utils/establishment/establishment";
import Value from "../../../shared/Value";
import State from "../../Sections/SharedComponents/State";

const Establishment = ({ establishment }) => {
  const codePostal = getCodePostal(establishment);
  const formatedPostalCode = codePostal ? `${codePostal.slice(0, 2)} - ` : "";

  return (
    <section>
      <div className="establishment__siret">
        <div className="establishment__state-icon">
          <State state={getState(establishment)} />
        </div>
        <Link
          to={`/establishment/${establishment.siret}`}
          className="establishment__siret"
        >
          <Value value={formatSiret(establishment.siret)} empty="" />
        </Link>
      </div>
      <div className="establishment__location">
        <Value value={formatedPostalCode} empty="" />

        <Value value={getCity(establishment)} empty="" />
      </div>
    </section>
  );
};

Establishment.propTypes = {
  establishment: PropTypes.object.isRequired,
};

export default Establishment;
