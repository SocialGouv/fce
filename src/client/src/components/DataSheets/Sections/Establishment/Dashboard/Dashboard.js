import React from "react";
import PropTypes from "prop-types";
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

const Dashboard = ({
  establishment,
  establishment: {
    pse,
    activite_partielle_24_derniers_mois,
    totalInteractions,
    interactions,
    dernier_effectif_physique,
    tranche_effectif_insee
  }
}) => {
  const hasInteractions = totalInteractions && totalInteractions.total > 0;

  const activity = {
    partialActivity:
      activite_partielle_24_derniers_mois &&
      activite_partielle_24_derniers_mois.length > 0,
    pseActivity:
      pse &&
      (pse.rupture_contrat_debut !== "0" || pse.rupture_contrat_fin !== "0")
  };

  const lastControl = hasInteractions
    ? getLastDateInteraction(interactions)
    : "";

  const dashboardSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

  return (
    <div className="dashboard columns">
      <Item
        icon={faChild}
        name="Effectif"
        value={
          isActiveEstablishment(establishment)
            ? dernier_effectif_physique ||
              dashboardSizeRanges[tranche_effectif_insee] ||
              ""
            : "0 salarié"
        }
      />
      <Item
        icon={faCalendarCheck}
        name="Visites"
        smallText={!hasInteractions}
        value={hasInteractions ? lastControl : "Pas d'intervention connue"}
      />
      {activity && (activity.pseActivity || activity.partialActivity) && (
        <Item
          icon={faExclamationTriangle}
          name="Activité"
          smallText={true}
          value={
            <>
              {activity.pseActivity && <div>PSE</div>}
              {activity.partialActivity && <div>Activité partielle</div>}
            </>
          }
        />
      )}
      {activity && activity.partialActivity && (
        <Item icon={faMedkit} name="Aides" value="Oui" />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default Dashboard;
