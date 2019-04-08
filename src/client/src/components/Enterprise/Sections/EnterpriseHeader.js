import React from "react";
import Value from "../../../elements/Value";
import moment from "moment";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faArrowAltRight,
  faPrint,
  faMapPin
} from "@fortawesome/fontawesome-pro-solid";

class EnterpriseHeader extends React.Component {
  render() {
    const { enterprise } = this.props;
    const slugSocieteCom = enterprise.raison_sociale
      .toLowerCase()
      .replace(" ", "-");

    return (
      <section id="header" className="enterprise-header">
        <div className="row top-header">
          <h1 className="title is-size-2">
            <Value
              value={
                enterprise.raison_sociale ||
                enterprise.sigle ||
                enterprise.nom_commercial ||
                `${enterprise.nom || ""} ${enterprise.prenom || ""}`.trim() ||
                null
              }
              empty=" "
            />
          </h1>
          <div>
            <div className="row">
              <span className="has-text-grey-dark">Fiche mise à jour le </span>
              <Value className="has-text-grey-dark has-text-weight-semibold" value={enterprise.date_mise_a_jour} empty=" " />
            </div>
            <button
              className="row button is-primary has-text-light is-pulled-right"
              onClick={() => window.print()}
            >
              <br />
              <span className="icon">
                <FontAwesomeIcon icon={faPrint} />
              </span>
              <span>Imprimer</span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="columns is-vcentered w-100">
            <div className="column is-2">
              <span className="is-size-5 has-text-grey-dark">Entreprise</span>
              <br />
              <span className="is-size-5 has-text-grey-dark">SIREN : </span>
              <span className="is-size-5 has-text-weight-semibold has-text-grey-dark">
                {enterprise.siren}
              </span>
            </div>
            <div className="column is-9">
              <button className="button is-primary has-text-light">
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowAltRight} />
                </span>
                <span>Siège social</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns is-vcentered w-100">
            <span className="column is-2 is-size-5">
              Voir sur{" "}
              <a
                className="is-link"
                href={`https://www.societe.com/societe/${slugSocieteCom}-${
                  enterprise.siren
                }.html`}
              >
                Societe.com
              </a>
            </span>
            <div className="column is-9">
              <button className="button is-primary has-text-light">
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowAltRight} />
                </span>
                <span>Autres établissements</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row is-pulled-right">
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
      </section>
    );
  }
}

export default EnterpriseHeader;
