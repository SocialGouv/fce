import React from "react";
import PropTypes from "prop-types";
import {
  faChild,
  faCalendarCheck,
  faExclamationTriangle,
  faMedkit
} from "@fortawesome/pro-solid-svg-icons";
import Config from "../../../../../services/Config";
import { getLastDateInteraction } from "../../../../../helpers/Date";
import { formatNumber } from "../../../../../helpers/utils";
import {
  isActiveEstablishment,
  hasApprentissage
} from "../../../../../helpers/Establishment";
import Item from "./Item";

import "./dashboard.scss";

const Dashboard = ({
  establishment,
  establishment: {
    activite_partielle,
    totalInteractions,
    interactions,
    dernier_effectif_physique,
    tranche_effectif_insee,
    pse,
    rcc,
    lice
  }
}) => {
  const hasInteractions = totalInteractions && totalInteractions.total > 0;

  const activity = {
    hasPse: !!(pse && pse.length),
    hasRcc: !!(rcc && rcc.length),
    hasLice: !!(lice && lice.length),
    liceTypes:
      lice &&
      lice.reduce(
        (liceTypes, currentProcedure) =>
          liceTypes.includes(currentProcedure.rawType)
            ? liceTypes
            : [...liceTypes, currentProcedure.rawType],
        []
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

  const effectif = isActiveEstablishment(establishment)
    ? (dernier_effectif_physique && formatNumber(dernier_effectif_physique)) ||
      dashboardSizeRanges[tranche_effectif_insee] ||
      "-"
    : "0 salarié";

  return (
    <div className="dashboard columns">
      <div className="column container">
        <Item
          icon={faChild}
          name="Effectif"
          smallText={tranche_effectif_insee === "00"}
          value={effectif}
        />

        <Item
          icon={faCalendarCheck}
          name="Visites"
          smallText={!hasInteractions}
          value={hasInteractions ? lastControl : "Pas d'intervention connue"}
        />

        {activity &&
          (activity.hasPse ||
            activity.hasRcc ||
            activity.hasLice ||
            activity.partialActivity) && (
            <Item
              icon={faExclamationTriangle}
              name="Mut Eco"
              smallText={true}
              value={
                <>
                  {activity.hasPse && <div>PSE</div>}
                  {activity.hasRcc && <div>RCC</div>}
                  {activity.hasLice &&
                    activity.liceTypes.map(type => (
                      <div key={type}>{type}</div>
                    ))}
                  {activity.partialActivity && <div>Activité partielle</div>}
                </>
              }
            />
          )}
        {(establishment.agrements_iae ||
          establishment.ea ||
          establishment.contrat_aide ||
          hasApprentissage(establishment.apprentissage)) && (
          <Item icon={faMedkit} name="Aides" value="Oui" />
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default Dashboard;
