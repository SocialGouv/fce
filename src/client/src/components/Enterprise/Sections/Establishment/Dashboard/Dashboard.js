import React from "react";
import {
  faChild,
  faCalendarCheck,
  faExclamationTriangle,
  faMedkit
} from "@fortawesome/fontawesome-pro-solid";
import Config from "../../../../../services/Config";
import { getLastDateInteraction } from "../../../../../helpers/Date";
import { isActiveEstablishment } from "../../../../../helpers/Establishment";
import Item from "./Item";
import "./dashboard.scss";

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

    const lastControl = hasInteractions
      ? getLastDateInteraction(establishment.interactions)
      : "";

    const dashboardSizeRanges = {
      ...Config.get("inseeSizeRanges"),
      "0 salarié": "0 salarié"
    };

    return (
      <div className="dashboard">
        <Item
          icon={faChild}
          name="Effectif"
          value={
            isActiveEstablishment(establishment)
              ? establishment.dernier_effectif_physique ||
                dashboardSizeRanges[establishment.tranche_effectif_insee]
              : "0 salarié"
          }
        />
        <Item
          icon={faCalendarCheck}
          name="Visites"
          value={hasInteractions ? lastControl : "Pas d'intervention connue"}
        />
        {activity && (activity.pseActivity || activity.partialActivity) && (
          <Item
            icon={faExclamationTriangle}
            name="Activité partielle PSE"
            value={[
              activity.partialActivity && "Activité partielle",
              activity.pseActivity && "PSE"
            ]}
          />
        )}
        {activity.partialActivity && (
          <Item icon={faMedkit} name="Aides" value="Oui" />
        )}
      </div>
    );
  }
}

export default Dashboard;
