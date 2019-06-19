import React from "react";
import withLoading from "../../../../services/Loading";
import Sidebar from "../../Sidebar";
import Header from "./Header";
import Activity from "./Activity";
import Finances from "./Finances";
import Mandataires from "./Mandataires";
import Direccte from "../SharedComponents/Direccte";

class Enterprise extends React.Component {
  render() {
    const { enterprise, headOffice, establishments } = this.props;

    return (
      <section className="data-sheet">
        <div className="columns">
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
                  isEstablishmentDisplayed={false}
                />
                <footer className="quickview-footer" />
              </div>
            </div>
          </div>
          <div className="column is-3 aside-box is-hidden-touch">
            <Sidebar
              enterprise={enterprise}
              headOffice={headOffice}
              establishments={establishments}
            />
          </div>
          <div className="column main is-9-desktop is-12-tablet">
            <Header enterprise={enterprise} />
            <Activity enterprise={enterprise} headOffice={headOffice} />
            <Finances establishment={headOffice} />
            <Direccte enterprise={enterprise} />
            <Mandataires enterprise={enterprise} />
          </div>
        </div>
      </section>
    );
  }
}

export default withLoading(Enterprise);
