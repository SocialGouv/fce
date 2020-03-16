import React from "react";
import PropTypes from "prop-types";
import { faPrint } from "@fortawesome/pro-solid-svg-icons";
import withLoading from "../../../../services/Loading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Activity from "./Activity";
import Muteco from "./Muteco";
import Helps from "./Helps";
import Relationship from "./Relationship";
import Direccte from "../SharedComponents/Direccte";
import QuickAccess from "../SharedComponents/QuickAccess";
import Button from "../../../shared/Button";
import UsersFeedback from "../../../../containers/UsersFeedback";

import "./establishment.scss";

const Establishment = ({
  establishment,
  establishments,
  enterprise,
  headOffice
}) => {
  return (
    <section className="data-sheet container">
      <div className="data-sheet__print-section w-100">
        <Button
          value="Imprimer"
          buttonClasses={["is-grey"]}
          icon={faPrint}
          callback={() => window.print()}
        />
      </div>
      <div className="columns print-wrapper">
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
            <Relationship establishment={establishment} />
            <Muteco establishment={establishment} />
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
  headOffice: PropTypes.object.isRequired
};

export default withLoading(Establishment);
