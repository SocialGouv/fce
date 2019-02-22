import React from "react";
import Value from "../../../elements/Value";
import classNames from "classnames";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faCircle, faChevronDown } from "@fortawesome/fontawesome-pro-solid";

class EstablishmentHelps extends React.Component {
  render() {
    const { establishment } = this.props;

    let actEcoTypes =
      establishment.structure_insertion_activite_economique_types;

    actEcoTypes = {
      ei: true,
      ai: true,
      aci: true,
      etti: true
    };

    let strActEco = "";
    const actEco = [];
    if (actEcoTypes) {
      if (actEcoTypes.ei) {
        actEco.push("Entreprise d'insertion");
      }
      if (actEcoTypes.ai) {
        actEco.push("Association intermédiaire");
      }
      if (actEcoTypes.aci) {
        actEco.push("Atelier et chantier d'insertion");
      }
      if (actEcoTypes.etti) {
        actEco.push("Entreprise de travail temporaire d'insteration");
      }
      strActEco = actEco.join(", ");
    }

    establishment.pse_en_projet_ou_en_cours = [
      {
        year: 2016,
        etat: "in bonis",
        poste: 34
      },
      {
        year: 2017,
        etat: "in bonis",
        poste: 45
      }
    ];
    establishment.activite_partielle_24_derniers_mois = [
      {
        year: 2016,
        heures_demandees: 50000,
        heures_consommees: 34530
      },
      {
        year: 2017,
        heures_demandees: 30000,
        heures_consommees: 16548
      }
    ];

    establishment.prime_embauche_pme = 5;

    establishment.alternance = {
      apprentisage: 3,
      professionnalisation: 1
    };

    establishment.contrats_aides = 8;

    return (
      <section id="muteco" className="enterprise-section">
        <h2 className="title is-size-4"> Aides</h2>
        <div className="columns">
          <h5 className="column is-3">Aide financière</h5>
          <span className="column is-8">
            {establishment.signataire_convention_FNE ? "Oui" : "Non disponible"}
          </span>
        </div>
        {establishment.activite_partielle_24_derniers_mois.length ? (
          <div className="accordions">
            <div className="accordion">
              <div className="accordion-header toggle">
                <span className="">Détail des aides</span>
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
                        <th>Aide</th>
                        <th>Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Fond Social Européen</td>
                        <td>Non disponible</td>
                      </tr>
                      <tr>
                        <td>Fond National de l'Emploi</td>
                        <td>Non disponible</td>
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
        <div className="columns">
          <h5 className="column is-3">
            Agrément structure de l'insertion par l'activité économique
          </h5>
          <span className="column is-8">
            <Value value="Oui" empty="Non disponible" no="Non disponible" />
          </span>
        </div>
        <div className="accordions">
          <div className="accordion">
            <div className="accordion-header toggle">
              <span className="">Détail de la structure</span>
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
                {actEco.map((ae, index) => (
                  <div key={index} className="columns">
                    <h5 className="column is-3">{ae}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {establishment.prime_embauche_pme ? (
          <div className="accordions">
            <div className="accordion">
              <div className="accordion-header toggle">
                <span className="">Prime embauche PME</span>
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
            <div className="accordion">
              <div className="accordion-header toggle">
                <span className="">Détail de l'alternance</span>
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
                  <table class="table table-striped">
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
            <div className="accordion">
              <div className="accordion-header toggle">
                <span className="">Contrats aidés</span>
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
