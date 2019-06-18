import React from "react";
import withLoading from "../../../../services/Loading";
import Establishments from "../../Establishments";
import Header from "./Header";
import Activity from "./Activity";
import Muteco from "./Muteco";
import Helps from "./Helps";
import Relationship from "./Relationship";
import Direccte from "../SharedComponents/Direccte";
import QuickAccess from "../SharedComponents/QuickAccess";
import Button from "../../../shared/Button";
import { faPrint } from "@fortawesome/fontawesome-pro-solid";

import "./establishment.scss";

class Establishment extends React.Component {
  render() {
    const {
      establishment,
      establishments,
      enterprise,
      headOffice
    } = this.props;

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
        <div className="columns">
          <div className="column is-3 aside-box is-hidden-touch">
            <Establishments
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
          </div>
          <div id="establishments" className="quickview responsive-item">
            <div className="quickview-body">
              <header className="quickview-header">
                <p className="title">Liste des établissements</p>
                <span className="delete" data-dismiss="quickview" />
              </header>
              <div className="quickview-block">
                <Establishments
                  enterprise={enterprise}
                  headOffice={headOffice}
                  establishments={establishments}
                />
                <footer className="quickview-footer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withLoading(Establishment);
