import React from "react";
import Value from "../../../elements/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import {
  faTimes,
  faCheckCircle,
  faCircle,
  faUser,
  faCalendarExclamation,
  faExclamationTriangle,
  faHandsHelping
} from "@fortawesome/fontawesome-pro-solid";

class Dashboard extends React.Component {
  render() {
    const { establishment } = this.props;

    const stateClass =
      establishment.etat_etablissement == "A"
        ? "icon--success"
        : "icon--danger";

    return (
      <section id="dashboard" className="enterprise-section dashboard">
        <div className="dashboard-mask" />
        <div className="dashboard-item dashboard-state">
          {/* <h3 class="title is-size-5">Etat</h3> */}
          <div className="dashboard-item--value">
            <FontAwesomeIcon
              className={classNames("dashboard-icon", stateClass)}
              icon={faCircle}
            />
            <span>
              {" "}
              {establishment.etat_etablissement == "A" ? "Actif" : "Fermé"}{" "}
            </span>
          </div>
        </div>
        <div className="dashboard-item dashboard-people">
          {/* <h3 class="title is-size-5">Effectif</h3> */}
          <div className="dashboard-item--value">
            <FontAwesomeIcon className="dashboard-icon" icon={faUser} />
            <span>x 15</span>
          </div>
        </div>
        <div className="dashboard-item dashboard-interactions">
          <div className="dashboard-item--value">
            <FontAwesomeIcon
              className="dashboard-icon"
              icon={faCalendarExclamation}
            />
            <span>x 20</span>
          </div>
        </div>
        <div className="dashboard-item dashboard-alerts">
          <div className="dashboard-item--value">
            <FontAwesomeIcon
              className="dashboard-icon dashboard-icon"
              icon={faExclamationTriangle}
            />
          </div>
        </div>
        <div className="dashboard-item dashboard-help">
          <div className="dashboard-item--value">
            <FontAwesomeIcon className="dashboard-icon" icon={faHandsHelping} />
          </div>
        </div>
      </section>
    );
  }
}

export default Dashboard;
