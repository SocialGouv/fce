import "./dashboard.scss";

import {
  faCalendarCheck,
  faChild,
  faExclamationTriangle,
  faGlobeAmericas,
  faGraduationCap,
  faMedkit,
  faUserInjured,
} from "@fortawesome/free-solid-svg-icons";
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
import { connect } from "react-redux";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import {
  getLatestInteraction,
  normalizeInteractions3E,
  normalizeInteractions3ESRC,
  normalizeInteractionsC,
  normalizeInteractionsT,
} from "../../../../../utils/interactions/interactions";
import { useDashboardData, useEffectif } from "./Dashboard.gql";
import Item from "./Item";

const interactionKeys = [
  "interactions_pole_3e",
  "interactions_pole_3e_src",
  "interactions_pole_c",
  "interactions_pole_t",
];

const getInteractions = pipe(
  pick(interactionKeys),
  ({
    interactions_pole_3e,
    interactions_pole_3e_src,
    interactions_pole_t,
    interactions_pole_c,
  }) => ({
    interactions_pole_3e: normalizeInteractions3E(interactions_pole_3e),
    interactions_pole_3e_src: normalizeInteractions3ESRC(
      interactions_pole_3e_src
    ),
    interactions_pole_c: normalizeInteractionsC(interactions_pole_c),
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

const Dashboard = ({ siret, psi }) => {
  const { data } = useDashboardData(siret);
  const { data: effectif, loading: effectifLoading } = useEffectif(siret);

  const hasInteractions = dataHasInteractions(data);

  const activity = {
    hasLice: data?.licePlus10?.length > 0 || data?.liceMoins10?.length > 0,
    hasPse: data?.pse?.length > 0,
    hasRcc: data?.rcc?.length > 0,
    liceTypes: getLiceTypes(data),
    partialActivity: data?.activite_partielle.length > 0,
  };

  const lastControl = getLatestInteraction(getInteractions(data))?.date;

  const establishmentPsiData = psi.establishments.find(
    (establishment) => establishment.siret === siret
  );

  const isEnterprisePsiContractor = Boolean(
    psi.enterprise.current_year + psi.enterprise.last_year
  );

  const isEstablishmentWithPsi = Boolean(establishmentPsiData);

  return (
    <div className="dashboard columns">
      <div className="column container">
        <Item
          icon={faChild}
          name="Effectif"
          value={effectifLoading ? "Chargement ..." : effectif}
        />

        <Item
          icon={faCalendarCheck}
          name="Visites"
          smallText={!hasInteractions}
          value={hasInteractions ? lastControl : "Pas d'intervention connue"}
        />

        {(activity.hasPse ||
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
                  activity.liceTypes.map((type) => (
                    <div key={type}>{type}</div>
                  ))}
                {activity.partialActivity && <div>Activité partielle</div>}
              </>
            }
          />
        )}

        {hasAide(data) && <Item icon={faMedkit} name="Aides" value="Oui" />}

        {(isEnterprisePsiContractor || isEstablishmentWithPsi) && (
          <Item
            icon={faGlobeAmericas}
            name="PSI"
            smallText={true}
            value={
              <div>
                {isEstablishmentWithPsi && <div>Salariés détachés</div>}
                {isEnterprisePsiContractor && <div>Entreprise DO</div>}
              </div>
            }
          />
        )}
        {data?.accidents_travail?.[0]?.total > 0 && (
          <Item
            icon={faUserInjured}
            name="Accident Travail"
            value={data?.accidents_travail?.[0]?.total}
          />
        )}
        {isOrganismeFormation(data) && (
          <Item icon={faGraduationCap} name="Organisme Formation" value="Oui" />
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  psi: PropTypes.object.isRequired,
  siret: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    psi: state.psi,
  };
};

export default renderIfSiret(connect(mapStateToProps, null)(Dashboard));
