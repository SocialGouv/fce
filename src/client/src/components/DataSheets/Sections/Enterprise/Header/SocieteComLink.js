import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import { getRaisonSociale } from "../../../../../utils/entreprise/entreprise";
import { useEntrepriseHeaderData } from "./EnterpriseHeader.gql";

const SocieteComLink = ({ siren }) => {
  const { data } = useEntrepriseHeaderData(siren);

  const entreprise = data?.entreprises[0];
  const slugSocieteCom = getRaisonSociale(entreprise)
    ? getRaisonSociale(entreprise).toLowerCase().replace(" ", "-")
    : "#";

  return (
    <a
      className="is-link"
      href={`https://www.societe.com/societe/${slugSocieteCom}-${siren}.html`}
    >
      Societe.com
    </a>
  );
};

SocieteComLink.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default renderIfSiren(SocieteComLink);
