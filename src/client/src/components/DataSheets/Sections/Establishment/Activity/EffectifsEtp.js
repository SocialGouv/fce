import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsEtp from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import { getMonthName } from "../../../../../helpers/Date";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Data from "../../SharedComponents/Data/Data";
import { useEffectifsEtpData } from "./EffectifsEtp.gql";

const MAX_EFFECTIF_COUNT = 24;

const EffectifsEtp = ({ siret }) => {
  const [maxDisplayedEffectifsCount, setMaxDisplayedEffectifsCount] =
    useState(3);

  const {
    loading,
    data: effectifsMensuels,
    error,
  } = useEffectifsEtpData(siret, {
    effectifsMaxCount: maxDisplayedEffectifsCount,
  });

  const showEffectifEtpButton =
    maxDisplayedEffectifsCount !== MAX_EFFECTIF_COUNT;

  return (
    <>
      <LoadableContent loading={loading} error={error}>
        {effectifsMensuels?.map?.(({ annee, mois, effectifs_mensuels }) => (
          <Data
            key={`${annee}-${mois}-effectifsETP`}
            hasNumberFormat={true}
            name={`Effectif ETP ${getMonthName(mois)} ${annee}`}
            nonEmptyValue=""
            sourceCustom={`Gip-Mds / DSN ${getMonthName(mois)} ${annee}`}
            value={effectifs_mensuels}
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
