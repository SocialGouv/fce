import React from "react";
import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion";
import bulmaQuickView from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
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

class Establishment extends React.Component {
  componentDidMount() {
    bulmaAccordion.attach();
    bulmaQuickView.attach();
  }

  render() {
    const { establishment, enterprise } = this.props;

    return (
      <section className="app-enterprise">
        <div className="columns">
          <div className="column is-3 aside-box is-hidden-touch">
            <Establishments
              enterprise={this.props.enterprise}
              headOffice={this.props.headOffice}
              establishments={this.props.establishments}
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
              <Dashboard
                className=""
                establishment={this.props.establishment}
              />
            </div>
            <EstablishmentActivity
              establishment={this.props.establishment}
              enterprise={this.props.enterprise}
            />
            <Direccte
              establishment={this.props.establishment}
              enterprise={this.props.enterprise}
            />
            <EstablishmentMuteco establishment={this.props.establishment} />
            <EstablishmentHelps establishment={this.props.establishment} />
          </div>
          <div id="establishments" className="quickview responsive-item">
            <div className="quickview-body">
              <header className="quickview-header">
                <p className="title">Liste des établissements</p>
                <span className="delete" data-dismiss="quickview" />
              </header>
              <div className="quickview-block">
                <Establishments
                  enterprise={this.props.enterprise}
                  headOffice={this.props.headOffice}
                  establishments={this.props.establishments}
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
