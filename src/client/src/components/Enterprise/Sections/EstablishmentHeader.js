import React from "react";
import Value from "../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faArrowAltRight, faPrint } from "@fortawesome/fontawesome-pro-solid";

class EstablishmentHeader extends React.Component {
  render() {
    const { enterprise, establishment } = this.props;
    const adrComponents = establishment.adresse_components;
    const slugSocieteCom = enterprise.raison_sociale
      .toLowerCase()
      .replace(" ", "-");
    const isActif = enterprise.etat_entreprise === "A";

    return (
      <section id="header" className="establishment-header w-100">
        <div className="has-text-link show-all-enterprise">
          <div
            className="responsive-item"
            data-show="quickview"
            data-target="enterprise"
          >
            <span>Voir les établissements</span>
            <span className="icon">
              <FontAwesomeIcon icon={faArrowAltRight} />
            </span>
          </div>
        </div>
        <div className="row top-header">
          <h1 className="title is-size-2">
            <Value
              value={
                establishment.nom_commercial ||
                `${establishment.nom || ""} ${establishment.prenom ||
                  ""}`.trim() ||
                null
              }
              empty=" "
            />
          </h1>
          <div>
            <button
              className="row button is-primary has-text-light is-pulled-right"
              onClick={() => window.print()}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faPrint} />
              </span>
              <span>Imprimer</span>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="columns is-vcentered w-100">
            <div className="column is-4">
              <span className="is-size-5 has-text-grey-dark">
                {establishment.categorie_etablissement}
              </span>
              <br />
              <span className="is-size-5 has-text-grey-dark">SIRET : </span>
              <span className="is-size-5 has-text-weight-semibold has-text-grey-dark">
                {establishment.siret}
              </span>
              <br />
              <span className="is-size-5 has-text-grey-dark">
                {isActif ? "Ouvert depuis le " : "Fermé depuis le "}
              </span>
              <span className="is-size-5 has-text-weight-semibold has-text-grey-dark">
                <Value
                  value={
                    isActif
                      ? establishment.date_creation
                      : establishment.date_dernier_traitement_etablissement
                  }
                  empty="-"
                />
              </span>
            </div>
            <div className="column is-8">
              <span className="is-size-4 has-text-grey-darker">{`${
                adrComponents.numero_voie
              }${adrComponents.indice_repetition} ${adrComponents.type_voie} ${
                adrComponents.nom_voie
              }`}</span>
              <br />
              <span className="is-size-4 has-text-grey-darker">{`${
                adrComponents.code_postal
              } ${adrComponents.localite}`}</span>
              <br />
              <span className="is-size-4 has-text-weight-semibold has-text-grey-darker">{`${
                establishment.naf
              } ${establishment.libelle_naf}`}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns is-vcentered w-100">
            <span className="column is-4 is-size-5">
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
          </div>
        </div>
      </section>
    );
  }
}

export default EstablishmentHeader;
