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

import { isIncluded } from "../../../../../helpers/utils";
import {
  hasPse,
  isInProcessState,
  isValidProcedureDuration
} from "../../../../../helpers/Pse";

import "./dashboard.scss";

const Dashboard = ({
  establishment,
  establishment: {
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
      hasPse(establishment) &&
      !!establishment.pse.find(
        pse =>
          isIncluded(pse.type_de_dossier, ["rcc"]) &&
          isValidProcedureDuration(pse.date_enregistrement) &&
          !isInProcessState(pse.etat_du_dossier)
      ),
    pseActivity:
      hasPse(establishment) &&
      !!establishment.pse.find(
        pse =>
          isIncluded(pse.type_de_dossier, ["pse"]) &&
          !isInProcessState(pse.etat_du_dossier) &&
          isValidProcedureDuration(pse.date_enregistrement) &&
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
  console.log(establishment);
  return (
    <div className="dashboard columns">
      <Item
        icon={faChild}
        name="Effectif"
        value={
          isActiveEstablishment(establishment)
            ? dernier_effectif_physique ||
              dashboardSizeRanges[tranche_effectif_insee] ||
              "-"
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
      {(establishment.agrements_iae ||
        establishment.ea ||
        establishment.contrat_aide) && (
        <Item icon={faMedkit} name="Aides" value="Oui" />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default Dashboard;
