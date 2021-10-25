import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import withLoading from "../../../../services/withLoading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Infos from "./Infos";
import EnterpriseRelationship from "./EnterpriseRelationship";
import Muteco from "./Muteco";
import Direccte from "./Direccte";
import Helps from "./Helps";
import QuickAccess from "../SharedComponents/QuickAccess";
import PrintSection from "../SharedComponents/PrintSection";
import UsersFeedback from "../../../../containers/UsersFeedback";
import Unsubscribe from "../../../../containers/Unsubscribe";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";

import "../../dataSheets.scss";

const Enterprise = ({ enterprise, headOffice, establishments, egapro }) => {
  const location = useLocation();
  useScrollToLocationHash({ location });

  return (
    <div>
      <section className="data-sheet container is-fullhd">
        <PrintSection />
        <div className="columns">
          <div className="column is-3 aside-box is-hidden-touch">
            <Sidebar
              enterprise={enterprise}
              headOffice={headOffice}
              establishments={establishments}
            />
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
                    link: "muteco"
                  },
                  { label: "Aides et agréments", link: "helps" }
                ]}
              />
              <Infos enterprise={enterprise} headOffice={headOffice} />
              <Direccte enterprise={enterprise} />
              <EnterpriseRelationship enterprise={enterprise} egapro={egapro} />
              <Muteco enterprise={enterprise} />
              <Helps enterprise={enterprise} />
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
  establishments: PropTypes.arrayOf(PropTypes.object).isRequired,
  headOffice: PropTypes.object.isRequired,
  egapro: PropTypes.object.isRequired
};

export default withLoading(Enterprise);
