import * as PropTypes from "prop-types";
import React, { useState } from "react";

import { useRenderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import { useOrganismeFormationBySiret } from "../../../../../services/OrganismeFormation/hooks";
import { isOrganismeFormation } from "../../../../../utils/organisme-formation/organisme-formation";
import ButtonLink from "../../../../shared/Button/ButtonLink";
import ArrowDown from "../../../../shared/Icons/ArrowDown.jsx";
import ArrowUp from "../../../../shared/Icons/ArrowUp.jsx";
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
  const shouldNotRender = useRenderIfSiret({
    siret,
  });

  if (error || loading || shouldNotRender) {
    return null;
  }

  return (
    <Subcategory subtitle="Organisme de formation" sourceSi="OF">
      <LoadableContent loading={loading} error={error}>
        <Data
          key="OrganismeFormation"
          name="Organisme de formation"
          className="has-no-border"
          value={isOrganismeFormation(data?.organismes_formation)}
        />
        <OrganismeFormationInfo
          organismes_formation={data?.organismes_formation}
        />
        {!showMore ? (
          <ButtonLink onClick={() => setShowMore(true)}>
            Voir plus de détails
            <span className="icon">
              <ArrowDown />
            </span>
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
            {showMore && (
              <ButtonLink onClick={() => setShowMore(false)}>
                Voir moins de détails
                <span className="icon">
                  <ArrowUp />
                </span>
              </ButtonLink>
            )}
          </>
        )}
      </LoadableContent>
    </Subcategory>
  );
};

OrganismeFormation.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default OrganismeFormation;
