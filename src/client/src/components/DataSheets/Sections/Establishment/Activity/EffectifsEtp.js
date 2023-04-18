import PropTypes from "prop-types";
import React, { useState } from "react";

import AllEffectifsEtp from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import { setYearMonthFormat } from "../../../../../helpers/Date";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Table from "../../SharedComponents/Table/Table";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";

const MAX_EFFECTIF_COUNT = 24;
const MIN_EFFECTIFS_COUNT = 3;
const EffectifsEtp = ({ siret }) => {
  const [displayedEffectifsCount, setDisplayedEffectifsCount] =
    useState(MIN_EFFECTIFS_COUNT);

  const {
    loading,
    data: effectifsMensuels,
    error,
  } = useEffectifsEtablissementsEtpData(siret, {
    effectifsMaxCount: displayedEffectifsCount,
  });

  return (
    <>
      <LoadableContent loading={loading} error={error}>
        {effectifsMensuels && (
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Effectif ETP</th>
              </tr>
            </thead>
            <tbody>
              {effectifsMensuels?.map?.(({ periode_concerne, effectif }) => (
                <tr key={`${periode_concerne}-effectifsETP`}>
                  <td>{setYearMonthFormat(periode_concerne)}</td>
                  <td>
                    <Value value={effectif} empty="-" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </LoadableContent>
      {displayedEffectifsCount === MIN_EFFECTIFS_COUNT && (
        <AllEffectifsEtp
          text="Afficher tous les effectifs ETP"
          loading={loading}
          onClick={() => setDisplayedEffectifsCount(MAX_EFFECTIF_COUNT)}
        />
      )}
      {displayedEffectifsCount === MAX_EFFECTIF_COUNT && (
        <AllEffectifsEtp
          text="Afficher moins d'effectifs ETP"
          loading={loading}
          onClick={() => setDisplayedEffectifsCount(MIN_EFFECTIFS_COUNT)}
        />
      )}
    </>
  );
};

EffectifsEtp.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifsEtp);
