/* eslint-disable prettier/prettier */
import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";

const AnnuaireEntreprisesLink = ({ siren }) => {
  const shouldNotRender = useRenderIfSiren({ siren });

  if (shouldNotRender) {
    return null;
  }

  return (
    <a
      className="is-link"
      rel="noreferrer noopener"
      target="_blank"
      href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`}
    >
      Annuaire des Entreprises
    </a>
  );
};

AnnuaireEntreprisesLink.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default AnnuaireEntreprisesLink;
