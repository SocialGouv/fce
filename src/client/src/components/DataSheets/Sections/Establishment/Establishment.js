import "../../dataSheets.scss";

import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom";

// import Unsubscribe from "../../../../containers/Unsubscribe";
import UsersFeedback from "../../../../containers/UsersFeedback";
import { renderIfSiret } from "../../../../helpers/hoc/renderIfSiret";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import { getSirenFromSiret } from "../../../../utils/establishment/establishment";
import Sidebar from "../../Sidebar/Sidebar";
import PrintSection from "../SharedComponents/PrintSection";
import QuickAccess from "../SharedComponents/QuickAccess";
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
      <section className="data-sheet container is-fullhd">
        <PrintSection />
        <div className="columns">
          <div className="column is-3 aside-box is-hidden-touch">
            <Sidebar siren={siren} isEstablishmentDisplayed={true} />
          </div>

          <div className="data-sheet__main-content column is-9-desktop is-12-tablet">
            <Header siret={siret} siren={siren} />
            <div className="data-sheet__main-container">
              <QuickAccess
                anchors={[
                  { label: "Activité", link: "activity" },
                  { label: "Visites et contrôles", link: "direccte" },
                  { label: "Relation travail", link: "relation" },
                  { label: "Mutations économiques", link: "muteco" },
                  { label: "Aides", link: "helps" },
                  { label: "Agréments", link: "agrements" },
                ]}
              />
              <Activite siret={siret} />
              <Controles siret={siret} />
              <Relationship siret={siret} />
              <Muteco siret={siret} />
              <Helps siret={siret} />
              <Agrements siret={siret} />
              <ListEstablishment
                siret={siret}
                siren={siren}
                isEstablishmentDisplayed={true}
              />
            </div>
            <UsersFeedback fullWidth />
          </div>
        </div>
      </section>
      {/* <Unsubscribe /> */}
    </div>
  );
};

Establishment.propTypes = {
  siret: PropTypes.string.isRequired,
  successions: PropTypes.object.isRequired,
};

export default renderIfSiret(Establishment);
