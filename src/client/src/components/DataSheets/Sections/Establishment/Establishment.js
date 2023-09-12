import "../../dataSheets.scss";

import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom";

// import Unsubscribe from "../../../../containers/Unsubscribe";
import UsersFeedback from "../../../../containers/UsersFeedback";
import { renderIfSiret } from "../../../../helpers/hoc/renderIfSiret";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import { getSirenFromSiret } from "../../../../utils/establishment/establishment";
import ScrollToTopButton from "../SharedComponents/ScrollToTopButton/ScrollToTopButton.jsx";
import Activite from "./Activity/Activite";
import Agrements from "./Agreements/Agrements";
import Controles from "./Direccte/Controles";
import Header from "./Header";
import Helps from "./Helps";
import ListEstablishment from "./ListEtablishments/ListEstablishment.jsx";
import Muteco from "./Muteco";
import Relationship from "./Relationship";

const Establishment = ({ siret }) => {
  const location = useLocation();
  useScrollToLocationHash({ location });

  const siren = getSirenFromSiret(siret);

  return (
    <div>
      <Header siret={siret} siren={siren} />
      <div className="data-sheet__main-container">
        <Activite siret={siret} />
        <Controles siret={siret} />
        <Relationship siret={siret} />
        <Muteco siret={siret} />
        <Helps siret={siret} />
        <Agrements siret={siret} />
        <ListEstablishment siren={siren} isEstablishmentDisplayed={true} />
      </div>
      <UsersFeedback fullWidth />
      <ScrollToTopButton />
    </div>

    //  <Unsubscribe />
  );
};

Establishment.propTypes = {
  siret: PropTypes.string.isRequired,
  successions: PropTypes.object.isRequired,
};

export default React.memo(renderIfSiret(Establishment));
