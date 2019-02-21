import React from "react";
import Value from "../../../elements/Value";
import EstablishmentTransfert from "./EstablishmentTransfert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-pro-solid";

const assocStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
};

class EstablishmentActivity extends React.Component {
  render() {
    const { establishment } = this.props;
    console.log(establishment);

    establishment.association = {
      id: "W313001376",
      siret: "83136781400010"
    };

    establishment.document_association = {
      url: "https://document_association.pdf"
    };

    return (
      <section id="activity" className="enterprise-section">
        <h2 className="title is-size-4">Activité</h2>

        <div className="columns">
          <h5 className="column is-3">Activité principale</h5>
          <span className="column is-8">
            <Value value={establishment.activite} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Association</h5>
          <span className="column is-8">
            <Value value={!!establishment.association} empty="-" />
            {establishment.association &&
            establishment.document_association &&
            establishment.document_association.url ? (
              <span>
                <span>&nbsp;- télécharger&nbsp;</span>
                <a
                  href={establishment.document_association.url}
                  target="_blank"
                >
                  les derniers statuts
                </a>
              </span>
            ) : null}
          </span>
        </div>
        <div className="columns">
          {establishment.association
            ? [
                <h5 className="column is-3" key="rna_label">
                  Numéro RNA
                </h5>,
                <span className="column is-8" key="rna_value">
                  <Value
                    value={
                      establishment.association.id ||
                      establishment.association.siret
                    }
                    empty="-"
                  />
                </span>
              ]
            : null}
        </div>
        {/* <div className="columns">
          {establishment.document_association
            ? [
                <h5 className="column is-3" key="rna_label">
                  Document association
                </h5>,
                <span className="column is-8" key="rna_value">
                  <a
                    href={
                      establishment.document_association &&
                      establishment.document_association.url
                    }
                  >
                    Télécharger les documents
                  </a>
                </span>
              ]
            : null}
        </div> */}
        <div className="columns">
          <h5 className="column is-3">Etablissement employeur</h5>
          <span className="column is-8">
            <Value
              value={establishment.etablissement_employeur && "Oui"}
              no="Non"
              empty="-"
            />
          </span>
        </div>
        <div className="accordions">
          <div className="accordion">
            <div className="accordion-header toggle">
              <span className="">Effectifs</span>
              <span className="">
                <button className="button is-light is-rounded">
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </button>
              </span>
            </div>
            <div className="accordion-body">
              <div className="accordion-content no-table">
                <div className="columns">
                  <h5 className="column is-3">Tranche Effectif INSEE</h5>
                  <span className="column is-8">
                    <Value
                      value={establishment.tranche_effectif_insee}
                      empty="-"
                    />
                  </span>
                </div>
                <div className="columns">
                  <h5 className="column is-3">Année tranche Effectif INSEE</h5>
                  <span className="column is-8">
                    <Value
                      value={establishment.annee_tranche_effectif_insee}
                      empty="-"
                    />
                  </span>
                </div>
                <div className="columns">
                  <h5 className="column is-3">Nombre d'intérimaires</h5>
                  <span className="column is-8">
                    <Value value={establishment.interim} empty="-" />
                  </span>
                </div>
                <div className="columns">
                  <h5 className="column is-3">Dernier effectif physique</h5>
                  <span className="column is-8">
                    <Value
                      value={establishment.dernier_effectif_physique}
                      empty="-"
                    />
                  </span>
                </div>
                <div className="columns">
                  <h5 className="column is-3">
                    Date dernier effectif physique
                  </h5>
                  <span className="column is-8">
                    <Value
                      value={establishment.date_dernier_effectif_physique}
                      empty="-"
                    />
                  </span>
                </div>
                <div className="columns">
                  <h5 className="column is-3">
                    Source dernier effectif physique
                  </h5>
                  <span className="column is-8">
                    <Value
                      value={establishment.source_dernier_effectif_physique}
                      empty="-"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <h5 className="column is-3">ETI / Pépite</h5>
          <span className="column is-8">
            <Value value={establishment.eti_pepite} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Filière stratégique</h5>
          <span className="column is-8">
            <Value value={establishment.filiere_strategique} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">
            Adhérent à un Pole de compétitivité (2015)
          </h5>
          <span className="column is-8">
            <Value
              value={
                Array.isArray(establishment.pole_competitivite) &&
                !!establishment.pole_competitivite.length
              }
            />
          </span>
        </div>
        <div className="accordions">
          <div className="accordion">
            <div className="accordion-header toggle">
              <span className="">Liste des pôles de compétitivité</span>
              <span className="">
                <button className="button is-light is-rounded">
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </button>
              </span>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">
                <table className="table is-striped">
                  <tbody>
                    {Array.isArray(establishment.pole_competitivite) &&
                      establishment.pole_competitivite.length &&
                      establishment.pole_competitivite.map(pole => (
                        <tr>
                          <td> {pole} </td>
                        </tr>
                      ))}
                    <tr>
                      <td>Lorem ipsum</td>
                    </tr>
                    <tr>
                      <td> Dolor sit amet </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {!establishment.predecesseur && !establishment.successeur ? (
          <div className="columns">
            <h5 className="column is-3">
              Etablissement Successeur / Prédecesseur
            </h5>
            <span className="column is-8">Pas d'informations</span>
          </div>
        ) : (
          <>
            <EstablishmentTransfert
              predecesseur={true}
              data={establishment.predecesseur}
            />{" "}
            <EstablishmentTransfert
              successeur={true}
              data={establishment.successeur}
            />
          </>
        )}
        <div className="columns">
          <h5 className="column is-3">
            Nombre d'accords déposés au cours des 24 derniers mois :
          </h5>
          <span className="column is-8">
            {establishment.accords ? establishment.accords.nb_accords : 0}
          </span>
        </div>
        <div className="accordions">
          <div className="accordion">
            <div className="accordion-header toggle">
              <span className="">Liste des accords par thématiques</span>
              <span className="">
                <button className="button is-light is-rounded">
                  <span className="icon">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </span>
                </button>
              </span>
            </div>
            <div className="accordion-body">
              <div className="accordion-content">
                <table className="table is-striped">
                  <thead>
                    <th className="th"> Thématique</th>
                    <th className="th"> Nombre accords concernés </th>
                  </thead>
                  <tbody>
                    {establishment.accords ? (
                      Object.keys(establishment.accords.details).map(theme => (
                        <tr>
                          <td> {theme} </td>
                          <td> {establishment.accords.details[theme]} </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td>Epargne salariale</td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>Salaires / Rémunérations</td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>Durée du travail / Repos</td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>Egalité professionnelle femmes / hommes</td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>Emploi / GPEC</td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>Conditions de travail</td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>
                            Prévoyance / protection sociale complémentaire
                          </td>
                          <td>NC</td>
                        </tr>
                        <tr>
                          <td>Autres</td>
                          <td>NC</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default EstablishmentActivity;
