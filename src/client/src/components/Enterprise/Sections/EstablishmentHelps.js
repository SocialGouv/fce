import React from "react";
import Value from "../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/fontawesome-pro-solid";
import Config from "../../../services/Config";

class EstablishmentHelps extends React.Component {
  render() {
    const { establishment } = this.props;

    const hasAgrements = !!(
      establishment.agrements_iae &&
      Object.values(establishment.agrements_iae)
        .map(agrementData => agrementData.agrement)
        .includes(true)
    );

    return (
      <section id="muteco" className="enterprise-section">
        <h2 className="title is-size-4">Aides</h2>

        <dl className="dl columns">
          <dt className="dt column is-3">
            Agrément(s) Insertion par l’activité économique (IAE)
          </dt>
          <dd className="dd column is-8">
            <Value value={hasAgrements} empty="-" />
          </dd>
        </dl>

        {hasAgrements && (
          <table className="table is-striped">
            <thead>
              <tr>
                <th />
                <th>Agrément(s) en 2018</th>
                <th>Nombre de salariés en insertion présents en N-1</th>
                <th>Nombre d’ETP en année N-1</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(Config.get("agrementsIae")).map(
                ([key, label]) => (
                  <tr key={key}>
                    <th>{label}</th>
                    <td>
                      <Value
                        value={establishment.agrements_iae[key].agrement}
                      />
                    </td>
                    <td>
                      <Value
                        value={
                          establishment.agrements_iae[key].salariesInsertion
                        }
                      />
                    </td>
                    <td>
                      <Value value={establishment.agrements_iae[key].etp} />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}

        <div className="columns">
          <h5 className="column is-3">Aide financière</h5>
          <span className="column is-8">
            {establishment.signataire_convention_FNE ? "Oui" : ""}
          </span>
        </div>
        {Array.isArray(establishment.activite_partielle_24_derniers_mois) &&
        establishment.activite_partielle_24_derniers_mois.length ? (
          <div className="accordions">
            <div className="accordion is-active">
              <div className="accordion-header toggle">
                <span>Détail des aides</span>
                <span>
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
                        <th>Aide</th>
                        <th>Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Fond Social Européen</td>
                        <td>
                          <Value value="Non disponible" empty="-" />
                        </td>
                      </tr>
                      <tr>
                        <td>Fond National de l'Emploi</td>
                        <td>
                          <Value value="Non disponible" empty="-" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div className="columns">
          <h5 className="column is-3">Entreprise adaptée </h5>
          <span className="column is-8">
            <Value value={!!establishment.ea} empty="-" />
          </span>
        </div>

        {establishment.prime_embauche_pme ? (
          <div className="accordions">
            <div className="accordion is-active">
              <div className="accordion-header toggle">
                <span>Prime embauche PME</span>
                <span>
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
                    <h5 className="column is-3">
                      Nombre d'embauches effectuées dans le cadre du dispositif
                    </h5>
                    <span className="column is-8">
                      <Value
                        value={establishment.prime_embauche_pme}
                        empty="Non disponible"
                        no="Non disponible"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="columns">
            <h5 className="column is-3">Prime embauche PME</h5>
            <span className="column is-8">Non disponible</span>
          </div>
        )}
        <div className="columns">
          <h5 className="column is-3">
            Recours à l'alternance au cours des 24 derniers mois
          </h5>
          <span className="column is-8">
            {establishment.alternance ? "Oui" : "Non disponible"}
          </span>
        </div>
        {establishment.alternance ? (
          <div className="accordions">
            <div className="accordion is-active">
              <div className="accordion-header toggle">
                <span>Détail de l'alternance</span>
                <span>
                  <button className="button is-light is-rounded">
                    <span className="icon">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </span>
                  </button>
                </span>
              </div>
              <div className="accordion-body">
                <div className="accordion-content">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Nombre d'embauches en contrat d'apprentissage</th>
                        <td>{establishment.alternance.apprentisage}</td>
                      </tr>
                      <tr>
                        <th>
                          Nombre d'embauches en contrat de professionnalisation
                        </th>
                        <td>{establishment.alternance.professionnalisation}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {establishment.contrats_aides ? (
          <div className="accordions">
            <div className="accordion is-active">
              <div className="accordion-header toggle">
                <span>Contrats aidés</span>
                <span>
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
                    <h5 className="column is-3"> Nombre de contrats aidés</h5>
                    <span className="column is-8">
                      <Value
                        value={establishment.contrats_aides}
                        empty="Non disponible"
                        no="Non disponible"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="columns">
            <h5 className="column is-3">Recours aux contrats aidés</h5>
            <span className="column is-8">Non disponible</span>
          </div>
        )}
      </section>
    );
  }
}

export default EstablishmentHelps;
