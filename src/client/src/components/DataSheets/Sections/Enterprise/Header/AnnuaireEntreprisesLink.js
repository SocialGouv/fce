/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";

const AnnuaireEntreprisesLink = ({ siren }) => {
  return (
    <a
      className="is-link"
      href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`}
    >
      Annuaire des Entreprises
    </a>
  );
};

AnnuaireEntreprisesLink.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default renderIfSiren(AnnuaireEntreprisesLink);
