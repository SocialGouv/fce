import React from "react";
import Value from "../../../elements/Value";
import EstablishmentTransfert from "./EstablishmentTransfert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-pro-solid";
import Config from "../../../services/Config";
class EstablishmentActivity extends React.Component {
  render() {
    const { establishment } = this.props;

    return (
      <section id="activity" className="enterprise-section">
        <h2 className="title is-size-4">Activité</h2>

        <div className="columns">
          <h5 className="column is-3">SIRET prédecesseur</h5>
          <span className="column is-8">
            <Value value={establishment.predecesseur} empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">Date transfert</h5>
          <span className="column is-8">
            <Value value="" empty="-" />
          </span>
        </div>

        <div className="columns">
          <h5 className="column is-3">IDCC</h5>
          <span className="column is-8">
            {establishment.code_idcc || establishment.libelle_idcc ? (
              <Value
                value={`${establishment.code_idcc} - ${
                  establishment.libelle_idcc
                }`}
                empty="-"
              />
            ) : (
              <span>-</span>
            )}
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
                  rel="noopener noreferrer"
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
          <div className="accordion is-active">
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
                      value={
                        Config.get("inseeSizeRanges")[
                          establishment.tranche_effectif_insee
                        ]
                      }
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
                  <h5 className="column is-3">Dernier effectif physique</h5>
                  <span className="column is-8">
                    <Value
                      value={establishment.dernier_effectif_physique}
                      empty="-"
                      nonEmptyValues={[0, "0"]}
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
                  <h5 className="column is-3">Nombre d'intérimaires</h5>
                  <span className="column is-8">
                    <Value value={establishment.interim} empty="-" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <h5 className="column is-3">ETI / Pépite</h5>
          <span className="column is-8">
            <Value
              value={
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].eti_pepite
              }
              empty="-"
            />
          </span>
        </div>
        <div className="columns">
          <h5 className="column is-3">Filière stratégique</h5>
          <span className="column is-8">
            <Value
              value={
                Array.isArray(establishment.interactions_3E) &&
                establishment.interactions_3E.length &&
                establishment.interactions_3E[0].filiere
              }
              empty="-"
            />
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
          <div className="accordion is-active">
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
            {establishment.accords
              ? Config.get("accords").reduce((total, typeAccord) => {
                  if (
                    establishment.accords &&
                    establishment.accords[typeAccord.key]
                  ) {
                    total += +establishment.accords[typeAccord.key];
                  }
                  return total;
                }, 0)
              : "-"}
          </span>
        </div>
        <div className="accordions">
          <div className="accordion is-active">
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
                    <tr>
                      <th className="th"> Thématique</th>
                      <th className="th"> Nombre accords concernés </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Config.get("accords").map(typeAccord => (
                      <tr key={`accord-${typeAccord.key}`}>
                        <td>{typeAccord.value}</td>
                        <td>
                          <Value
                            value={
                              establishment.accords &&
                              establishment.accords[typeAccord.key]
                            }
                            empty="-"
                            nonEmptyValues={[0, "0"]}
                          />
                        </td>
                      </tr>
                    ))}
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
