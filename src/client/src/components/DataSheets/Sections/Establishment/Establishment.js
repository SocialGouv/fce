import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
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
import Unsubscribe from "../../../../containers/Unsubscribe";
import PrintSection from "../SharedComponents/PrintSection";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";

import "../../dataSheets.scss";
import Agrements from "./Agreements/Agrements";

const Establishment = ({
  establishment,
  establishments,
  enterprise,
  headOffice,
  apprentissage,
  successions
}) => {
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
              isEstablishmentDisplayed={true}
            />
          </div>

          <div className="data-sheet__main-content column is-9-desktop is-12-tablet">
            <Header
              establishment={establishment}
              enterprise={enterprise}
              apprentissage={apprentissage}
            />
            <div className="data-sheet__main-container">
              <QuickAccess
                anchors={[
                  { label: "Activité", link: "activity" },
                  { label: "Visites et contrôles", link: "direccte" },
                  { label: "Relation travail", link: "relation" },
                  { label: "Mutations économiques", link: "muteco" },
                  { label: "Aides", link: "helps" },
                  { label: "Agréments", link: "agrements" }
                ]}
              />
              <Activity
                establishment={establishment}
                enterprise={enterprise}
                successions={successions}
              />
              <Direccte establishment={establishment} enterprise={enterprise} />
              <Relationship
                establishment={establishment}
                enterprise={enterprise}
              />
              <Muteco establishment={establishment} enterprise={enterprise} />
              <Helps
                establishment={establishment}
                apprentissage={apprentissage}
              />
              <Agrements etablissement={establishment} />
            </div>
            <UsersFeedback fullWidth />
          </div>
        </div>
      </section>
      <Unsubscribe />
    </div>
  );
};

Establishment.propTypes = {
  enterprise: PropTypes.object.isRequired,
  establishment: PropTypes.object.isRequired,
  apprentissage: PropTypes.object.isRequired,
  establishments: PropTypes.arrayOf(PropTypes.object).isRequired,
  headOffice: PropTypes.object.isRequired,
  successions: PropTypes.object.isRequired
};

export default withLoading(Establishment);
