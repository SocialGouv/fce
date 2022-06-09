import { pipe, replace, toLower } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import { useRaisonSociale } from "./EnterpriseHeader.gql";

const formatRaisonSociale = pipe(
  replace("*/", " "),
  replace("/", ""),
  toLower,
  replace(" ", "-")
);

const SocieteComLink = ({ siren }) => {
  const { data: raisonSociale } = useRaisonSociale(siren);

  const slugSocieteCom = raisonSociale
    ? formatRaisonSociale(raisonSociale)
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
