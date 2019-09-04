import React from "react";
import withLoading from "../../../../services/Loading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Infos from "./Infos";
import Mandataires from "./Mandataires";
import Direccte from "../SharedComponents/Direccte";
import Finances from "./Finances";
import QuickAccess from "../SharedComponents/QuickAccess";
import Button from "../../../shared/Button";
import { faPrint } from "@fortawesome/fontawesome-pro-solid";

class Enterprise extends React.Component {
  render() {
    const { enterprise, headOffice, establishments } = this.props;

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
                  { label: "Données financières", link: "finances" },
                  { label: "Mandataires sociaux", link: "mandataires" }
                ]}
              />
              <Infos enterprise={enterprise} headOffice={headOffice} />
              <Direccte enterprise={enterprise} />
              <Finances establishment={headOffice} />
              <Mandataires enterprise={enterprise} />
            </div>
          </div>
        </div>
        <div id="establishments" className="quickview responsive-item">
          <div className="quickview-body">
            <header className="quickview-header">
              <p className="title">Liste des établissements</p>
              <span className="delete" data-dismiss="quickview" />
            </header>
            <div className="quickview-block">
              <Sidebar
                enterprise={enterprise}
                headOffice={headOffice}
                establishments={establishments}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withLoading(Enterprise);