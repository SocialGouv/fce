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
import { hasInclude } from "../../../../../helpers/utils";
import "./dashboard.scss";

const Dashboard = ({
  establishment,
  establishment: {
    pse,
    activite_partielle,
    totalInteractions,
    interactions,
    dernier_effectif_physique,
    tranche_effectif_insee
  }
}) => {
  const hasInteractions = totalInteractions && totalInteractions.total > 0;

  const activity = {
    rccActivity:
      pse &&
      establishment.pse.find(pse =>
        hasInclude(pse.type_de_dossier, ["RCC", "rcc"])
      ),
    pseActivity:
      pse &&
      establishment.pse.filter(
        pse =>
          hasInclude(pse.type_de_dossier, ["PSE", "pse"]) &&
          pse.contrats_ruptures_debut + pse.contrats_ruptures_fin > 0
      ),
    partialActivity: activite_partielle && activite_partielle.length > 0
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
              dashboardSizeRanges[tranche_effectif_insee]
            : "0 salarié"
        }
      />
      <Item
        icon={faCalendarCheck}
        name="Visites"
        smallText={!hasInteractions}
        value={hasInteractions ? lastControl : "Pas d'intervention connue"}
      />
      {activity && (activity.pseActivity || activity.rccActivity) && (
        <Item
          icon={faExclamationTriangle}
          name="Mut Eco"
          smallText={true}
          value={
            <>
              {activity.pseActivity && <div>PSE</div>}
              {activity.rccActivity && <div>RCC</div>}
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
