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

    return (
      <section id="dashboard" className="enterprise-section dashboard">
        <div className="dashboard-mask" />
        <div className="dashboard-item dashboard-people">
          <div className="dashboard-item--content">
            <span className="dashboard-item--value">
              <Value
                value={establishment.dernier_effectif_physique}
                empty="-"
                nonEmptyValues={[0, "0"]}
              />
            </span>
            <span className="dashboard-item--desc">Effectif</span>
          </div>
        </div>
        <div className="dashboard-item dashboard-interactions">
          <div className="dashboard-item--content">
            <span className="dashboard-item--value">
              <Value
                value={
                  establishment.totalInteractions &&
                  establishment.totalInteractions.total
                }
                empty=" "
                nonEmptyValues={[0, "0"]}
              />
            </span>
            <span className="dashboard-item--desc">
              visite(s) et contrôle(s)
            </span>
          </div>
        </div>
        <div className="dashboard-item dashboard-alerts">
          <div className="dashboard-item--content">
            <span className="dashboard-item--value">
              <FontAwesomeIcon
                className="dashboard-icon dashboard-icon"
                icon={faExclamationTriangle}
              />
            </span>
            <span className="dashboard-item--desc">
              Signaux faibles à vérifier
            </span>
          </div>
        </div>
        <div className="dashboard-item dashboard-help">
          <div className="dashboard-item--content">
            <span className="dashboard-item--value">
              <FontAwesomeIcon className="dashboard-icon" icon={faLifeRing} />
            </span>
            <span className="dashboard-item--desc">Aides</span>
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
