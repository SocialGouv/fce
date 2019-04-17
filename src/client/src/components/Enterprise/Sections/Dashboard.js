import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import moment from "moment";
import Value from "../../../elements/Value";
import {
  faExclamationTriangle,
  faLifeRing
} from "@fortawesome/fontawesome-pro-solid";

class Dashboard extends React.Component {
  render() {
    const { establishment } = this.props;

    const hasInteractions =
      establishment.totalInteractions &&
      establishment.totalInteractions.total > 0;

    const activity = {
      partialActivity:
        establishment.activite_partielle_24_derniers_mois &&
        establishment.activite_partielle_24_derniers_mois.length > 0,
      pseActivity:
        establishment.pse_en_projet_ou_en_cours &&
        establishment.pse_en_projet_ou_en_cours.length > 0
    };

    const sizeRanges = {
      NN: "Unités non employeuses",
      "0 salarié": "0 salarié",
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

    const moments =
      establishment.interactions &&
      establishment.interactions.map(interaction => moment(interaction.date));

    const lastControl = moment.max(moments).format("DD/MM/YYYY");

    return (
      <section id="dashboard" className="enterprise-section dashboard">
        <div className="dashboard-mask" />
        <div className="dashboard-item dashboard-people">
          <div className="dashboard-item--content">
            <span className="dashboard-item--desc">Effectif</span>
            <span className="dashboard-item--value">
              <Value
                value={sizeRanges[establishment.tranche_effectif_insee]}
                empty="-"
              />
            </span>
          </div>
        </div>
        <div className="dashboard-item dashboard-interactions">
          <div className="dashboard-item--content">
            <span className="dashboard-item--desc">
              {hasInteractions ? "Dernier contrôle : " : "Pas de visite connue"}
            </span>
            <span className="dashboard-item--value">
              {hasInteractions && <Value value={lastControl} empty="-" />}
            </span>
          </div>
        </div>
        {activity && (activity.pseActivity || activity.partialActivity) && (
          <div className="dashboard-indicator dashboard-alerts">
            <div className="dashboard-item--content">
              <span className="dashboard-item--value">
                <FontAwesomeIcon
                  className="dashboard-icon dashboard-icon"
                  icon={faExclamationTriangle}
                />
              </span>
              <span className="dashboard-item--desc">
                {activity.partialActivity && "Activité partielle"}
                <br />
                {activity.pseActivity && "PSE"}
              </span>
            </div>
          </div>
        )}
        {activity.partialActivity && (
          <div className="dashboard-indicator dashboard-help">
            <div className="dashboard-item--content">
              <span className="dashboard-item--value">
                <FontAwesomeIcon
                  className="dashboard-icon"
                  color="red"
                  icon={faLifeRing}
                />
              </span>
              <span className="dashboard-item--desc">Aides</span>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Dashboard;
