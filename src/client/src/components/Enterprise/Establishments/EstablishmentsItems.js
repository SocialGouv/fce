import React from "react";
import Establishment from "./Establishment";

const EstablishmentsItems = ({ establishments, limit = null }) => {
  const establishmentsList = limit
    ? establishments.slice(0, limit)
    : establishments;

  return establishmentsList.map((establishment, index) => (
    <article key={establishment.siret}>
      <Establishment establishment={establishment} effectif={false} />
    </article>
  ));
};

export default EstablishmentsItems;
