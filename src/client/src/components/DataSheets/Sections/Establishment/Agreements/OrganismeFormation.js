import * as PropTypes from "prop-types";
import { useOrganismeFormationBySiret } from "../../../../../services/OrganismeFormation/hooks";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Data from "../../SharedComponents/Data";
import OrganismeFormationInfo from "./OrganismeFormationInfo";
import OrganismeFormationTypes from "./OrganismeFormationTypes";
import OrganismeFormationSpecialty from "./OrganismeFormationSpecialty";
import OrganismeFormationEffectifs from "./OrganismeFormationEffectifs";
import Subcategory from "../../SharedComponents/Subcategory";
import React, { useState } from "react";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";

const OrganismeFormation = ({ siret }) => {
  const { loading, error, data } = useOrganismeFormationBySiret(siret);
  const [showMore, setShowMore] = useState(false);

  return (
    <Subcategory subtitle="Organisme de formation">
      <PgApiDataHandler isLoading={loading} error={error}>
        {loading === false && (
          <>
            <Data
              key="OrganismeFormation"
              name="Organisme de formation"
              value={isOrganismeFormation(data.organismes_formation)}
            />
            <OrganismeFormationInfo
              organismes_formation={data.organismes_formation}
            />
            {!showMore ? (
              <a onClick={() => setShowMore(true)}>&gt; Voir plus de détails</a>
            ) : (
              <>
                <OrganismeFormationTypes
                  organismes_formation={data.organismes_formation}
                />
                <OrganismeFormationSpecialty
                  organismes_formation={data.organismes_formation}
                />
                <OrganismeFormationEffectifs
                  organismes_formation={data.organismes_formation}
                />
              </>
            )}
          </>
        )}
      </PgApiDataHandler>
    </Subcategory>
  );
};

OrganismeFormation.propTypes = {
  siret: PropTypes.string.isRequired
};

export default OrganismeFormation;
