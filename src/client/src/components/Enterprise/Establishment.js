import React from "react";
import withLoading from "../../services/Loading";
import Establishments from "./Establishments";
import {
  Dashboard,
  EstablishmentHeader,
  EstablishmentActivity,
  EstablishmentMuteco,
  EstablishmentHelps,
  Direccte
} from "./Sections";
import EstablishmentRelationship from "./Sections/EstablishmentRelationship";

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
              <EstablishmentHeader
                establishment={establishment}
                enterprise={enterprise}
              />
            </div>
            <div className="establishment-keys row w-100">
              <Dashboard className="" establishment={establishment} />
            </div>
            <EstablishmentActivity
              establishment={establishment}
              enterprise={enterprise}
            />
            <Direccte establishment={establishment} enterprise={enterprise} />
            <EstablishmentRelationship establishment={establishment} />
            <EstablishmentMuteco establishment={establishment} />
            <EstablishmentHelps establishment={establishment} />
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
