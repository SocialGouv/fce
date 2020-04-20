import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { faPrint } from "@fortawesome/pro-solid-svg-icons";
import withLoading from "../../../../services/withLoading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Infos from "./Infos";
import Mandataires from "./Mandataires";
import Accords from "./Accords";
import Muteco from "./Muteco";
import Direccte from "../SharedComponents/Direccte";
import Finances from "./Finances";
import QuickAccess from "../SharedComponents/QuickAccess";
import Button from "../../../shared/Button";
import UsersFeedback from "../../../../containers/UsersFeedback";

const Enterprise = ({ enterprise, headOffice, establishments, location }) => {
  useEffect(() => {
    const scrollTarget = document.getElementById(location.hash.slice(1));
    window.scrollTo({
      behavior: scrollTarget ? "smooth" : "auto",
      top: scrollTarget ? scrollTarget.offsetTop + 70 : 0
    });
  });

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
                { label: "Accords d'entreprise", link: "accords" },
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
            <Accords enterprise={enterprise} />
            <Muteco enterprise={enterprise} />
            <Finances establishment={headOffice} />
            <Mandataires enterprise={enterprise} />
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
  headOffice: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(withLoading(Enterprise));
