import "../../dataSheets.scss";

import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "react-router-dom";

import Unsubscribe from "../../../../containers/Unsubscribe";
import UsersFeedback from "../../../../containers/UsersFeedback";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import withLoading from "../../../../services/withLoading";
import { getSiren } from "../../../../utils/entreprise/entreprise";
import Sidebar from "../../Sidebar/Sidebar";
import PrintSection from "../SharedComponents/PrintSection";
import QuickAccess from "../SharedComponents/QuickAccess";
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

  return (
    <div>
      <section className="data-sheet container is-fullhd">
        <PrintSection />
        <div className="columns">
          <div className="column is-3 aside-box is-hidden-touch">
            <Sidebar siren={getSiren(enterprise)} />
          </div>
          <div className="data-sheet__main-content column is-9-desktop is-12-tablet">
            <Header enterprise={enterprise} />
            <div className="data-sheet__main-container">
              <QuickAccess
                anchors={[
                  { label: "Informations légales", link: "infos" },
                  { label: "Visites et contrôles", link: "direccte" },
                  { label: "Relation travail", link: "relationship" },
                  {
                    label: "Mutations économiques",
                    link: "muteco",
                  },
                  { label: "Aides", link: "helps" },
                  { label: "Agréments", link: "agrements" },
                ]}
              />
              <Infos enterprise={enterprise} />
              <Direccte entreprise={enterprise} />
              <RelationsEntreprise enterprise={enterprise} />
              <Muteco enterprise={enterprise} />
              <Helps enterprise={enterprise} />
              <Agrements enterprise={enterprise} />
            </div>
            <UsersFeedback fullWidth />
          </div>
        </div>
      </section>
      <Unsubscribe />
    </div>
  );
};

Enterprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default withLoading(Enterprise);
