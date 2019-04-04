import React from "react";
import Value from "../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faArrowAltRight,
  faPrint,
  faMapPin
} from "@fortawesome/fontawesome-pro-solid";

class EnterpriseHeader extends React.Component {
  render() {
    const { enterprise } = this.props;
    const rs = enterprise.raison_sociale.toLowerCase().replace(" ", "-");

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
          <a
            className="button is-primary has-text-light"
            onClick={() => window.print()}
          >
            <br />
            <span className="icon">
              <FontAwesomeIcon icon={faPrint} />
            </span>
            <span>Imprimer</span>
          </a>
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
              <a className="button is-primary has-text-light">
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowAltRight} />
                </span>
                <span>Siège social</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns is-vcentered w-100">
            <span className="column is-2 is-size-5">
              Voir sur{" "}
              <a
                className="is-link"
                href={`https://www.societe.com/societe/${rs}-${
                  enterprise.siren
                }.html`}
              >
                Societe.com
              </a>
            </span>
            <div className="column is-9">
              <a className="button is-primary has-text-light">
                <span className="icon">
                  <FontAwesomeIcon icon={faArrowAltRight} />
                </span>
                <span>Autres établissements</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row is-pulled-right">
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
      </section>
    );
  }
}

export default EnterpriseHeader;
