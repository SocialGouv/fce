import React from "react";
import Value from "../../../elements/Value";
import EstablishmentTransfert from "./EstablishmentTransfert";
import classNames from "classnames";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown } from "@fortawesome/fontawesome-pro-solid";

class EstablishmentActivity extends React.Component {
  render() {
    const { establishment } = this.props;
    console.log(establishment);

    const stateClass =
      establishment.etat_etablissement == "A"
        ? "icon--success"
        : "icon--danger";

    return (
      <section id="activity" className="enterprise-section">
        <h1 className="title is-size-4">État et activité</h1>

        <div className="columns">
          <h5 className="column is-3">Date de création</h5>
          <span className="column is-8">
            <Value value={establishment.date_creation} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Etat de l'établissement</h5>
          <span className="column is-8">
            {establishment.etat_etablissement && (
              <FontAwesomeIcon
                className={classNames(stateClass)}
                icon={faCircle}
              />
            )}
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Date de l'état</h5>
          <span className="column is-8">
            <Value
              value={
                establishment.etat_etablissement === "F"
                  ? establishment.date_fin
                  : establishment.date_dernier_traitement_etablissement
              }
              empty="-"
            />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Activité</h5>
          <span className="column is-8">
            <Value value={establishment.naf} empty="-" />
            <span> - </span>
            <Value value={establishment.libelle_naf} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Activité économique depuis le</h5>
          <span className="column is-8">
            <Value
              value={establishment.date_debut_activite_economique}
              empty="-"
            />
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
                &nbsp;Télécharger&nbsp;
                <a
                  href={establishment.document_association.url}
                  target="_blank"
                >
                  les derniers statuts
                </a>
                .
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
        <div className="columns">
          {establishment.document_association
            ? [
                <h5 className="column is-3" key="rna_label">
                  Document association
                </h5>,
                <span className="column is-8" key="rna_value">
                  <Value
                    value={
                      establishment.document_association &&
                      establishment.document_association.url
                    }
                    empty="-"
                  />
                </span>
              ]
            : null}
        </div>
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
        <div className="columns">
          <h5 className="column is-3">Tranche Effectif INSEE</h5>
          <span className="column is-8">
            <Value value={establishment.tranche_effectif_insee} empty="-" />
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
            <Value value={establishment.dernier_effectif_physique} empty="-" />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Date dernier effectif physique</h5>
          <span className="column is-8">
            <Value
              value={establishment.date_dernier_effectif_physique}
              empty="-"
            />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Source dernier effectif physique</h5>
          <span className="column is-8">
            <Value
              value={establishment.source_dernier_effectif_physique}
              empty="-"
            />
          </span>
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
