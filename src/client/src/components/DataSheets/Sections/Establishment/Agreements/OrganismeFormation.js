import * as PropTypes from "prop-types";
import React, { useState } from "react";

import { useOrganismeFormationBySiret } from "../../../../../services/OrganismeFormation/hooks";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import ButtonLink from "../../../../shared/Button/ButtonLink";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Subcategory from "../../SharedComponents/Subcategory";
import OrganismeFormationEffectifs from "./OrganismeFormationEffectifs";
import OrganismeFormationInfo from "./OrganismeFormationInfo";
import OrganismeFormationSpecialty from "./OrganismeFormationSpecialty";
import OrganismeFormationTypes from "./OrganismeFormationTypes";

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
              <ButtonLink onClick={() => setShowMore(true)}>
                &gt; Voir plus de détails
              </ButtonLink>
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
  siret: PropTypes.string.isRequired,
};

export default OrganismeFormation;
