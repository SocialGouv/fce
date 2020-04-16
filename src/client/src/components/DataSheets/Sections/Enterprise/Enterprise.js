import PropTypes from "prop-types";
import React from "react";
import { faPrint } from "@fortawesome/pro-solid-svg-icons";
import withLoading from "../../../../services/withLoading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Infos from "./Infos";
import EnterpriseRelationship from "./EnterpriseRelationship";
import Muteco from "./Muteco";
import Direccte from "./Direccte";
import Finances from "./Finances";
import QuickAccess from "../SharedComponents/QuickAccess";
import Button from "../../../shared/Button";
import UsersFeedback from "../../../../containers/UsersFeedback";

const Enterprise = ({ enterprise, headOffice, establishments }) => {
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
                { label: "Données financières", link: "finances" },
                { label: "Mandataires sociaux", link: "mandataires" }
              ]}
            />
            <Infos enterprise={enterprise} headOffice={headOffice} />
            <Direccte enterprise={enterprise} />
            <EnterpriseRelationship enterprise={enterprise} />
            <Muteco enterprise={enterprise} />
            <Finances establishment={headOffice} />
          </div>
          <UsersFeedback fullWidth />
        </div>
      </div>
    </section>
  );
};

Enterprise.propTypes = {
  enterprise: PropTypes.object.isRequired,
  establishments: PropTypes.arrayOf(PropTypes.object).isRequired,
  headOffice: PropTypes.object.isRequired
};

export default withLoading(Enterprise);
