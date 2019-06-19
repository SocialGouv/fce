import React from "react";
import Establishment from "./Establishment";

const EstablishmentsItems = ({
  establishments,
  establishmentType,
  limit = null
}) => {
  const limitedEstablishmentsList = limit
    ? establishments.slice(0, limit)
    : establishments;

  const establishmentsList = limitedEstablishmentsList.map(establishment => (
    <li key={establishment.siret} className="sidebar__establishment">
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

export default EstablishmentsItems;
