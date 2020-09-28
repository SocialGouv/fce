import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import withLoading from "../../../../services/withLoading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Activity from "./Activity";
import Muteco from "./Muteco";
import Helps from "./Helps";
import Relationship from "./Relationship";
import Direccte from "./Direccte";
import QuickAccess from "../SharedComponents/QuickAccess";
import UsersFeedback from "../../../../containers/UsersFeedback";
import { useScrollToLocationHash } from "../../../../helpers/hooks";
import PrintSection from "../SharedComponents/PrintSection";

import "../../dataSheets.scss";

const Establishment = ({
  establishment,
  establishments,
  enterprise,
  headOffice,
  location
}) => {
  useScrollToLocationHash({ location, offset: 70 });

  return (
    <section className="data-sheet container is-fullhd">
      <PrintSection />
      <div className="columns">
        <div className="column is-3 aside-box is-hidden-touch">
          <Sidebar
            enterprise={enterprise}
            headOffice={headOffice}
            establishments={establishments}
            isEstablishmentDisplayed={true}
          />
        </div>

        <div className="data-sheet__main-content column is-9-desktop is-12-tablet">
          <Header establishment={establishment} enterprise={enterprise} />
          <div className="data-sheet__main-container">
            <QuickAccess
              anchors={[
                { label: "Activité", link: "activity" },
                { label: "Visites et contrôles", link: "direccte" },
                { label: "Relation travail", link: "relation" },
                { label: "Mutations économiques", link: "muteco" },
                { label: "Aides et agréments", link: "helps" }
              ]}
            />
            <Activity establishment={establishment} enterprise={enterprise} />
            <Direccte establishment={establishment} enterprise={enterprise} />
            <Relationship
              establishment={establishment}
              enterprise={enterprise}
            />
            <Muteco establishment={establishment} enterprise={enterprise} />
            <Helps establishment={establishment} />
          </div>
          <UsersFeedback fullWidth />
        </div>
      </div>
    </section>
  );
};

Establishment.propTypes = {
  enterprise: PropTypes.object.isRequired,
  establishment: PropTypes.object.isRequired,
  establishments: PropTypes.arrayOf(PropTypes.object).isRequired,
  headOffice: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(withLoading(Establishment));
