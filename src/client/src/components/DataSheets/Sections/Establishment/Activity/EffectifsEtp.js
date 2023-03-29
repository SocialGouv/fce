import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsEtp from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import { getDateMonthName, getDateYear } from "../../../../../helpers/Date";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Data from "../../SharedComponents/Data/Data";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";

const MAX_EFFECTIF_COUNT = 24;

const EffectifsEtp = ({ siret }) => {
  const [maxDisplayedEffectifsCount, setMaxDisplayedEffectifsCount] =
    useState(3);

  const {
    loading,
    data: effectifsMensuels,
    error,
  } = useEffectifsEtablissementsEtpData(siret, {
    effectifsMaxCount: maxDisplayedEffectifsCount,
  });

  const showEffectifEtpButton =
    maxDisplayedEffectifsCount !== MAX_EFFECTIF_COUNT;

  return (
    <>
      <LoadableContent loading={loading} error={error}>
        {effectifsMensuels?.map?.(({ periode_concerne, effectif }) => (
          <Data
            key={`${periode_concerne}-effectifsETP`}
            hasNumberFormat={true}
            name={`Effectif ETP ${getDateMonthName(
              periode_concerne
            )} ${getDateYear(periode_concerne)}`}
            nonEmptyValue=""
            sourceCustom={`Gip-Mds / DSN ${getDateMonthName(
              periode_concerne
            )} ${getDateYear(periode_concerne)}`}
            value={effectif}
          />
        ))}
      </LoadableContent>
      {showEffectifEtpButton && (
        <AllEffectifsEtp
          loading={loading}
          onClick={() => setMaxDisplayedEffectifsCount(MAX_EFFECTIF_COUNT)}
        />
      )}
    </>
  );
};

EffectifsEtp.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifsEtp);
