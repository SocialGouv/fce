import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
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

    return (
      <section id="dashboard" className="enterprise-section dashboard">
        <div className="dashboard-mask" />
        <div className="dashboard-item dashboard-people">
          <div className="dashboard-item--content">
            <span className="dashboard-item--desc">Effectif</span>
            <span className="dashboard-item--value">
              <Value
                value={establishment.dernier_effectif_physique}
                empty="0"
                nonEmptyValues={[0, "0"]}
              />
            </span>
          </div>
        </div>
        <div className="dashboard-item dashboard-interactions">
          <div className="dashboard-item--content">
            <span className="dashboard-item--desc">
              {hasInteractions ? "Visite et contrôle" : "Pas de visite connue"}
            </span>
            <span className="dashboard-item--value">
              {hasInteractions && (
                <Value
                  value={
                    establishment.totalInteractions &&
                    establishment.totalInteractions.total
                  }
                  empty=" "
                  nonEmptyValues={[0, "0"]}
                />
              )}
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
