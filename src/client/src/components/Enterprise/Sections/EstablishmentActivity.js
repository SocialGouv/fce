import React from "react";
import Value from "../../../elements/Value";
import EstablishmentTransfert from "./EstablishmentTransfert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-pro-solid";
import Config from "../../../services/Config";

class EstablishmentActivity extends React.Component {
  render() {
    const sizeRanges = {
      NN: "Unités non employeuses",
      "0 salarié": "0 salarié (pas d'effectif au 31/12 )",
      "01": "1 ou 2 salariés",
      "02": "3 à 5 salariés",
      "03": "6 à 9 salariés",
      "11": "10 à 19 salariés",
      "12": "20 à 49 salariés",
      "21": "50 à 99 salariés",
      "22": "100 à 199 salariés",
      "31": "200 à 249 salariés",
      "32": "250 à 499 salariés",
      "41": "500 à 999 salariés",
      "42": "1 000 à 1 999 salariés",
      "51": "2 000 à 4 999 salariés",
      "52": "5 000 à 9 999 salariés",
      "53": "10 000 salariés et plus"
    };

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
                      value={sizeRanges[establishment.tranche_effectif_insee]}
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
