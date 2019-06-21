import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import classNames from "classnames";
import Establishment from "../Establishment";

const EstablishmentsItems = ({
  establishments,
  establishmentType,
  headOffice,
  limit = null,
  match
}) => {
  const limitedEstablishmentsList = limit
    ? establishments.slice(0, limit)
    : establishments;

  const establishmentsList = limitedEstablishmentsList.map(establishment => (
    <li
      key={establishment.siret}
      className={classNames("sidebar__establishment", {
        "head-office": headOffice,
        "sidebar__establishment--current":
          establishment.siret === match.params.siret
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
  establishments: PropTypes.array.isRequired,
  establishmentType: PropTypes.string.isRequired,
  headOffice: PropTypes.bool,
  limit: PropTypes.number,
  match: PropTypes.object.isRequired
};

export default withRouter(EstablishmentsItems);
