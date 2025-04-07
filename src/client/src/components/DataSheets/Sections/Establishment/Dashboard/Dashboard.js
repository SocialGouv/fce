import "./dashboard.scss";

import {
  entries,
  filter,
  flatten,
  map,
  pick,
  pipe,
  some,
  values,
} from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import {
  getLatestInteraction,
  normalizeInteractions3E,
  normalizeInteractions3ESRC,
  normalizeInteractionsC,
  normalizeInteractionsT,
} from "../../../../../utils/interactions/interactions";
import Calendar from "../../../../shared/Icons/Calendar.jsx";
import Effectif from "../../../../shared/Icons/EffectifIcon.jsx";
import HealthIcon from "../../../../shared/Icons/HealthIcon.jsx";
import Hospital from "../../../../shared/Icons/HospitalIcon.jsx";
import Network from "../../../../shared/Icons/Network.jsx";
import SchoolIcon from "../../../../shared/Icons/SchoolIcon.jsx";
import Warning from "../../../../shared/Icons/Warning.jsx";
import { useDashboardData, useEffectif } from "./Dashboard.gql";
import Item from "./Item";

const interactionKeys = [
  "interactions_pole_3e",
  "interactions_pole_3e_src",
  "interactions_pole_c",
  "interactions_pole_t",
  "interactions_pole_c_metrologie",
];

const getInteractions = pipe(
  pick(interactionKeys),
  ({
    interactions_pole_3e,
    interactions_pole_3e_src,
    interactions_pole_t,
    interactions_pole_c,
    interactions_pole_c_metrologie,
  }) => ({
    interactions_pole_3e: normalizeInteractions3E(interactions_pole_3e),
    interactions_pole_3e_src: normalizeInteractions3ESRC(
      interactions_pole_3e_src
    ),
    interactions_pole_c: normalizeInteractionsC(interactions_pole_c),
    interactions_pole_c_metrologie: normalizeInteractionsC(
      interactions_pole_c_metrologie
    ),
    interactions_pole_t: normalizeInteractionsT(interactions_pole_t),
  }),
  values,
  flatten
);

const dataHasInteractions = pipe(
  pick(interactionKeys),
  values,
  some((value) => value.length > 0)
);

const liceKeys = ["licePlus10", "liceMoins10", "pse", "rcc"];

const getLiceTypes = pipe(
  pick(liceKeys),
  entries,
  filter(([, value]) => value.length > 0),
  map(([key]) => key)
);

const aideKeys = [
  "etablissements_iae",
  "etablissements_contrats_aides",
  "etablissements_apprentissage",
];

const hasAide = pipe(
  pick(aideKeys),
  values,
  some((list) => list.length > 0)
);

const isOrganismeFormation = (data) => data?.organismes_formation?.length > 0;

const Dashboard = ({ siret }) => {
  const { data } = useDashboardData(siret);

  const { data: effectif, loading: effectifLoading } = useEffectif(siret);
  const shouldNotRender = useRenderIfSiret({ siret });

  if (shouldNotRender) {
    return null;
  }
  const hasInteractions = dataHasInteractions(data);

  const activity = {
    hasLice: data?.licePlus10?.length > 0 || data?.liceMoins10?.length > 0,
    hasPse: data?.pse?.length > 0,
    hasRcc: data?.rcc?.length > 0,
    liceTypes: getLiceTypes(data),
    partialActivity: data?.activite_partielle.length > 0,
  };

  const lastControl = getLatestInteraction(getInteractions(data))?.date;

  const establishmentPsiData = data?.psi_siret?.SIRET === siret;

  const isEnterprisePsiContractor = Boolean(
    data?.psi_siren[0]?.salaries_annee_courante +
      data?.psi_siren[0]?.salaries_annee_precedente
  );
  const isEstablishmentWithPsi = Boolean(establishmentPsiData);
  const effectifItem = <Effectif size={40} />;

  return (
    <div className="dashboard ">
      <div className="column ">
        <div className="columns  ">
          <Item
            icon={effectifItem}
            name="Effectif"
            value={effectifLoading ? "Chargement ..." : effectif}
          />

          <Item
            icon={<Calendar />}
            name="Visites"
            smallText={!hasInteractions}
            value={hasInteractions ? lastControl : "Pas d'intervention connue"}
          />

          <Item
            icon={<Warning />}
            name="Mutations économiques"
            smallText={true}
            value={
              <>
                {!activity.hasPse &&
                  !activity.hasRcc &&
                  !activity.hasLice &&
                  !activity.partialActivity &&
                  "Non"}
                <div>
                  {activity.hasPse && "PSE-"}
                  {activity.hasRcc && "RCC-"}
                  {activity.hasLice && activity.liceTypes?.join("-")}
                </div>

                {activity.partialActivity && <div>Activité partielle</div>}
              </>
            }
          />
        </div>
        <div className="columns  ">
          <Item
            icon={<Network />}
            name="PSI"
            smallText={true}
            value={
              <>
                {isEstablishmentWithPsi && (
                  <div className="has-list-style">Salariés détachés </div>
                )}
                {isEnterprisePsiContractor && (
                  <div className="has-list-style">Entreprise DO</div>
                )}

                {!isEnterprisePsiContractor && !isEstablishmentWithPsi && "Non"}
              </>
            }
          />
          <Item
            icon={<Hospital />}
            name="Accident Travail"
            value={data?.accidents_travail?.[0]?.total}
            empty="Non"
          />
          <Item
            icon={<HealthIcon />}
            name="Aides"
            value={hasAide(data) ? "Oui" : "Non"}
          />

          <Item
            icon={<SchoolIcon />}
            name="Organisme Formation"
            value={isOrganismeFormation(data) ? "Oui" : "Non"}
          />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default Dashboard;
