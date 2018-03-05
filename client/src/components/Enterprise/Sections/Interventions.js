import React from "react";
import Value from "../../../elements/Value";
import classNames from "classnames";

class Interventions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleElement = id => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  render() {
    const { establishment } = this.props;

    return (
      <section id="interventions" className="enterprise-section">
        <h1 className="title h4">Interventions publiques</h1>

        <section id="development">
          <h2 className="h5">Développement économique</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">ETI / Pépite</dt>
            <dd className="dd col-md-8">
              <Value value={establishment.eti_pepite} empty="-" />
            </dd>

            <dt className="dt col-md-4">Filière stratégique</dt>
            <dd className="dd definition col-md-8">
              <Value value={establishment.filiere_strategique} empty="-" />
            </dd>
          </dl>
        </section>

        <section id="job">
          <h2 className="h5">Emploi et insertion professionnelle</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">
              Structure de l'insertion par l'activité économique
            </dt>
            <dd className="dd col-md-8">
              <Value
                value={establishment.structure_insertion_activite_economique}
                empty="-"
              />
            </dd>
          </dl>
        </section>

        <section id="mutations">
          <h2 className="h5">Mutations économiques</h2>

          <dl className="dl row">
            <dt className="dt col-md-4">
              Demande d'activité partielle dans les 24 derniers mois
            </dt>
            <dd className="dd col-md-8">
              <a
                className="d-print-none"
                href="#mutation-activity"
                onClick={() => this.toggleElement("mutation-activity")}
              >
                Voir le détail
              </a>
            </dd>
          </dl>

          <div
            id="mutation-activity"
            className={classNames({
              "toggle-element": true,
              "d-none": !this.state["mutation-activity"],
              "d-print-block": true
            })}
          >
            <table className="table table-striped">
              <thead>
                <tr>
                  <th />
                  <th>2016</th>
                  <th>2017</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Nombre d'heures demandées</th>
                  <td>xxx</td>
                  <td>xxx</td>
                </tr>
                <tr>
                  <th scope="row">Nombre d'heures consommées</th>
                  <td>xxx</td>
                  <td>xxx</td>
                </tr>
              </tbody>
            </table>
          </div>

          <dl className="dl row">
            <dt className="dt col-md-4">
              Plan de sauvegarde de l'emploi ou projet en cours
            </dt>
            <dd className="dd col-md-8">
              <a
                className="d-print-none"
                href="#mutation-job"
                onClick={() => this.toggleElement("mutation-job")}
              >
                Voir le détail
              </a>
            </dd>
          </dl>

          <div
            id="mutation-job"
            className={classNames({
              "toggle-element": true,
              "d-none": !this.state["mutation-job"],
              "d-print-block": true
            })}
          >
            <dl className="dl row">
              <dt className="dt col-md-4">Année d'ouverture du PSE</dt>
              <dd className="dd col-md-8">[Année d'ouverture du PSE]</dd>

              <dt className="dt col-md-4">État de l'établissement</dt>
              <dd className="dd col-md-8">[État de l'établissement]</dd>

              <dt className="dt col-md-4">
                Nombre de postes indicatifs au PSE
              </dt>
              <dd className="dd col-md-8">
                [Nombre de postes indicatifs au PSE]
              </dd>

              <dt className="dt col-md-4">Année d'ouverture du PSE</dt>
              <dd className="dd col-md-8">[Année d'ouverture du PSE]</dd>

              <dt className="dt col-md-4">État de l'établissement</dt>
              <dd className="dd col-md-8">[État de l'établissement]</dd>

              <dt className="dt col-md-4">
                Nombre de postes indicatifs au PSE
              </dt>
              <dd className="dd col-md-8">
                [Nombre de postes indicatifs au PSE]
              </dd>
            </dl>
          </div>
        </section>
      </section>
    );
  }
}

export default Interventions;
