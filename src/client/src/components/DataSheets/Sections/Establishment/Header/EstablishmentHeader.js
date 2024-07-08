import PropTypes from "prop-types";
import React from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import {
  getAdresse,
  getCategoryLabel,
  getCodePostalAndCity,
} from "../../../../../utils/establishment/establishment";
import Dashboard from "../Dashboard";
import EntrepriseName from "./EntrepriseName";
import {
  useEstablishmentHeaderData,
  useEstablishmentHeaderNumData,
} from "./EstablishmentHeader.gql";
import HeaderInfoBloc from "./HeaderInfoBloc.jsx";

const EstablishmentHeader = ({ siret, siren }) => {
  const { data: etablissement } = useEstablishmentHeaderData(siret);
  const { data: etablissementCount } = useEstablishmentHeaderNumData(siren);
  const adresse = getAdresse(etablissement);
  const code = getCodePostalAndCity(etablissement);

  return (
    <section id="header" className="data-sheet-header">
      <EntrepriseName siret={siret} />
      {etablissement && (
        <HeaderInfoBloc
          etablissement={etablissement}
          etablissementCount={etablissementCount}
          infoBoxValue={getCategoryLabel(etablissement)}
          siret={siret}
          adresse={adresse}
          code={code}
        />
      )}{" "}
      <Dashboard siret={siret} />
    </section>
  );
};

EstablishmentHeader.propTypes = {
  siren: PropTypes.string.isRequired,
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EstablishmentHeader);
