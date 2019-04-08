import React from "react";
import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion";
import bulmaQuickView from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import withLoading from "../../services/Loading";
import Establishments from "./Establishments";
import {
  Direccte,
  EnterpriseHeader,
  EnterpriseActivity,
  Finances,
  Mandataires
} from "./Sections";

class Enterprise extends React.Component {

  componentDidMount() {
    bulmaAccordion.attach();
    bulmaQuickView.attach();
  }

  render() {
    const { enterprise, headOffice } = this.props;

    return (
      <section className="app-enterprise">
        <div className="enterprise-overlay" />
        <div className="columns">
          <div className="column main is-9-desktop is-12-tablet">
            <EnterpriseHeader enterprise={enterprise} />
            <EnterpriseActivity
              enterprise={enterprise}
              headOffice={headOffice}
            />
            <Finances establishment={headOffice} />
            <Direccte enterprise={enterprise} />
            <Mandataires enterprise={enterprise} />
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
          <div className="column is-3 aside-box">
            <Establishments
              enterprise={this.props.enterprise}
              headOffice={this.props.headOffice}
              establishments={this.props.establishments}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default withLoading(Enterprise);
