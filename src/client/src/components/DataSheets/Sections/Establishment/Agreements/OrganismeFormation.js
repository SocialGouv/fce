import * as PropTypes from "prop-types";
import React, { useState } from "react";

import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import { useOrganismeFormationBySiret } from "../../../../../services/OrganismeFormation/hooks";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import ButtonLink from "../../../../shared/Button/ButtonLink";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import OrganismeFormationEffectifs from "./OrganismeFormationEffectifs";
import OrganismeFormationInfo from "./OrganismeFormationInfo";
import OrganismeFormationSpecialty from "./OrganismeFormationSpecialty";
import OrganismeFormationTypes from "./OrganismeFormationTypes";

const OrganismeFormation = ({ siret }) => {
  const { loading, error, data } = useOrganismeFormationBySiret(siret);
  const [showMore, setShowMore] = useState(false);

  return (
    <Subcategory subtitle="Organisme de formation" sourceSi="OF">
      <LoadableContent loading={loading} error={error}>
        <Data
          key="OrganismeFormation"
          name="Organisme de formation"
          value={isOrganismeFormation(data?.organismes_formation)}
        />
        <OrganismeFormationInfo
          organismes_formation={data?.organismes_formation}
        />
        {!showMore ? (
          <ButtonLink onClick={() => setShowMore(true)}>
            &gt; Voir plus de détails
          </ButtonLink>
        ) : (
          <>
            <OrganismeFormationTypes
              organismes_formation={data?.organismes_formation}
            />
            <OrganismeFormationSpecialty
              organismes_formation={data?.organismes_formation}
            />
            <OrganismeFormationEffectifs
              organismes_formation={data?.organismes_formation}
            />
          </>
        )}
      </LoadableContent>
    </Subcategory>
  );
};

OrganismeFormation.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(OrganismeFormation);
