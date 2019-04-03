import React from "react";
import { Link } from "react-router-dom";
import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion";
import bulmaQuickView from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import withLoading from "../../services/Loading";
import { Row, Col, Button } from "reactstrap";
import QuickAccess from "./QuickAccess";
import Establishments from "./Establishments";
import MailTo from "./MailTo";
import Value from "../../elements/Value";
import {
  Direccte,
  EnterpriseIdentity,
  EnterpriseActivity,
  EnterpriseHeadOffice,
  Mandataires
} from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faMapPin,
  faArrowAltLeft
} from "@fortawesome/fontawesome-pro-solid";

class Enterprise extends React.Component {
  getSections = () => {
    return [
      { name: "Identité", id: "identity" },
      { name: "État et activité", id: "activity" },
      { name: "Siège social", id: "headoffice" },
      { name: "Eco & Fina.", id: "finances" },
      { name: "Attestations", id: "attestations" },
      { name: "Mandataires", id: "mandataire" },
      { name: "DIRECCTE", id: "direccte" }
    ];
  };

  componentDidMount() {
    const accordions = bulmaAccordion.attach();
    const quickviews = bulmaQuickView.attach();
  }

  render() {
    const { enterprise, headOffice } = this.props;

    return (
      <section className="app-enterprise">
        <div className="columns">
          <div className="column main is-9-desktop is-12-tablet">
            <h2 className="subtitle">Fiche Entreprise</h2>

            <h1 className="title is-size-1">
              <Value
                value={
                  enterprise.raison_sociale ||
                  enterprise.sigle ||
                  enterprise.nom_commercial ||
                  `${enterprise.nom || ""} ${enterprise.prenom || ""}`.trim() ||
                  null
                }
                empty="-"
              />
            </h1>

            <div className="task-bar d-print-none">
              {this.props.hasSearchResults ? (
                <button
                  className="button back-button is-dark"
                  onClick={() => this.props.history.goBack()}
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={faArrowAltLeft} />
                  </span>
                  <span>Retour aux résultats</span>
                </button>
              ) : (
                ""
              )}
              <a
                className="button is-primary has-text-light"
                onClick={() => window.print()}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faPrint} />
                </span>
                <span>Imprimer</span>
              </a>
              <MailTo type="enterprise" enterprise={enterprise} />
              <a
                className="button is-primary has-text-light responsive-item"
                data-show="quickview"
                data-target="establishments"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faMapPin} />
                </span>
                <span>Voir les établissements</span>
              </a>
            </div>

            <EnterpriseIdentity enterprise={enterprise} />
            <EnterpriseActivity
              enterprise={enterprise}
              headOffice={headOffice}
            />
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
