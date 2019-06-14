import React from "react";
import withLoading from "../../services/Loading";
import Establishments from "./Establishments";
import {
  Dashboard,
  Header,
  Activity,
  Muteco,
  Helps,
  Relationship
} from "./Sections/Establishment";
import Direccte from "./Sections/Direccte";
import QuickAccess from "./Sections/SharedComponents/QuickAccess";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/fontawesome-pro-solid";

class Establishment extends React.Component {
  render() {
    const {
      establishment,
      establishments,
      enterprise,
      headOffice
    } = this.props;

    return (
      <section className="app-enterprise">
        <div className="print-section w-100">
          <button
            className="button is-primary has-text-light"
            onClick={() => window.print()}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faPrint} />
            </span>
            <span>Imprimer</span>
          </button>
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
          <div className="main establishment column is-9-desktop is-12-tablet">
            <div className="row w-100">
              <Header establishment={establishment} enterprise={enterprise} />
            </div>
            <div className="establishment-keys row w-100">
              <Dashboard establishment={establishment} />
            </div>
            <div className="w-100">
              <QuickAccess />
            </div>
            <Activity establishment={establishment} enterprise={enterprise} />
            <Direccte establishment={establishment} enterprise={enterprise} />
            <Relationship establishment={establishment} />
            <Muteco establishment={establishment} />
            <Helps establishment={establishment} />
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
