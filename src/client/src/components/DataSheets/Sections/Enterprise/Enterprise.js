import "../../dataSheets.scss";

import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom";

// import Unsubscribe from "../../../../containers/Unsubscribe";
import UsersFeedback from "../../../../containers/UsersFeedback";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import withLoading from "../../../../services/withLoading";
import { getSiren } from "../../../../utils/entreprise/entreprise";
import Sidebar from "../../Sidebar/Sidebar";
import ListEstablishment from "../Establishment/ListEtablishments/ListEstablishment.jsx";
import { EstablishmentProvider } from "../SharedComponents/EstablishmentContext.jsx";
import ScrollToTopButton from "../SharedComponents/ScrollToTopButton/ScrollToTopButton.jsx";
import SubHeader from "../SharedComponents/SubHeader/SubHeader.jsx";
import Agrements from "./Agrements/Agrements";
import Direccte from "./Direccte";
import RelationsEntreprise from "./EnterpriseRelationship";
import Header from "./Header";
import Helps from "./Helps";
import Infos from "./Infos";
import Muteco from "./Muteco";

const Enterprise = ({ enterprise }) => {
  const location = useLocation();
  useScrollToLocationHash({ location });
  const siren = getSiren(enterprise);
  return (
    <EstablishmentProvider siren={siren}>
      <div>
        <SubHeader siren={siren} />

        <section className="data-sheet container is-fullhd">
          <div className="columns">
            <div className="column is-3 aside-box is-hidden-touch">
              <Sidebar siren={siren} isEntrepriseDisplayed />
            </div>
            <div className="data-sheet__main-content column is-9-desktop is-12-tablet">
              <Header enterprise={enterprise} />
              <div className="data-sheet__main-container">
                <Infos enterprise={enterprise} />
                <Direccte entreprise={enterprise} />
                <RelationsEntreprise enterprise={enterprise} />
                <Muteco enterprise={enterprise} />
                <Helps enterprise={enterprise} />
                <Agrements enterprise={enterprise} />
                <ListEstablishment isEstablishmentDisplayed={true} />
              </div>
              <UsersFeedback fullWidth />
              <ScrollToTopButton />
            </div>
          </div>
        </section>
        {/* <Unsubscribe /> */}
      </div>
    </EstablishmentProvider>
  );
};

Enterprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default React.memo(withLoading(Enterprise));
