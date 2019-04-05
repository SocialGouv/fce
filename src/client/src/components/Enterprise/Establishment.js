import React from "react";
import bulmaAccordion from "bulma-extensions/bulma-accordion/dist/js/bulma-accordion";
import bulmaQuickView from "bulma-extensions/bulma-quickview/dist/js/bulma-quickview";
import withLoading from "../../services/Loading";
import Establishments from "./Establishments";
import MailTo from "./MailTo";
import Value from "../../elements/Value";
import {
  Dashboard,
  EstablishmentActivity,
  EstablishmentIdentity,
  EstablishmentMuteco,
  EstablishmentHelps,
  Direccte
} from "./Sections";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faArrowAltLeft,
  faMapPin
} from "@fortawesome/fontawesome-pro-light";

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
          <div className="main establishment column is-9-desktop is-12-tablet">
            <h2 className="subtitle">Fiche Établissement</h2>

            <h1 className="title is-size-1">
              <Value
                value={establishment.enseigne}
                empty={enterprise.raison_sociale}
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
              <button
                className="button is-primary has-text-light"
                onClick={() => window.print()}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faPrint} />
                </span>
                <span>Imprimer</span>
              </button>
              <MailTo
                type="establishment"
                enterprise={enterprise}
                establishment={establishment}
              />
              <button
                className="button is-primary has-text-light responsive-item"
                data-show="quickview"
                data-target="establishments"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faMapPin} />
                </span>
                <span>Voir les établissements</span>
              </button>
            </div>

            <div className="establishment-keys">
              <EstablishmentIdentity
                establishment={this.props.establishment}
                enterprise={this.props.enterprise}
                headOffice={this.props.headOffice}
                className=""
              />
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

export default withLoading(Establishment);
