import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router";

import Establishment from "../Establishment";

const EstablishmentsItems = ({
  establishments,
  establishmentType,
  headOffice,
  limit = null,
  match,
}) => {
  const limitedEstablishmentsList = limit
    ? establishments.slice(0, limit)
    : establishments;

  const establishmentsList = limitedEstablishmentsList.map((establishment) => (
    <li
      key={establishment.siret}
      className={classNames("sidebar__establishment", {
        "head-office": headOffice,
        "sidebar__establishment--current":
          establishment.siret === match.params.siret,
      })}
    >
      <Establishment establishment={establishment} effectif={false} />
    </li>
  ));

  return (
    <>
      <h4 className="sidebar__establishments-type">{establishmentType}</h4>
      <ul>{establishmentsList}</ul>
    </>
  );
};

EstablishmentsItems.propTypes = {
  establishmentType: PropTypes.string.isRequired,
  establishments: PropTypes.array.isRequired,
  headOffice: PropTypes.bool,
  limit: PropTypes.number,
  match: PropTypes.object.isRequired,
};

export default withRouter(EstablishmentsItems);
