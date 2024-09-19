import "./establishmentActivity.scss";

import PropTypes from "prop-types";
import React, { useState } from "react";
import Toggle from "react-toggle";

import AllEffectifsEtp from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import {
  getDateMonthName,
  getDateYear,
  setYearMonthFormat,
} from "../../../../../helpers/Date";
import { useRenderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import EffectifGraph from "./EffectifGraph";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";

const MAX_EFFECTIF_COUNT = 60;
const MIN_EFFECTIFS_COUNT = 1;
const start_date = "2018-01-01";
const EffectifsEtp = ({ siret }) => {
  const [displayedEffectifsCount, setDisplayedEffectifsCount] =
    useState(MIN_EFFECTIFS_COUNT);
  const [displayTable, setDisplayTable] = useState(true);

  const {
    loading,
    data: effectifsMensuels,
    error,
  } = useEffectifsEtablissementsEtpData(
    siret,
    {
      effectifsMaxCount: displayedEffectifsCount,
    },
    { periode_concerne: "desc" },
    start_date
  );
  const shouldNotRender = useRenderIfSiret({
    siret,
  });

  if (error || loading || shouldNotRender) {
    return null;
  }
  const handleChange = (event) => {
    setDisplayTable(event.target.checked);
  };
  if (!effectifsMensuels || effectifsMensuels.length == 0) {
    return (
      <Data
        name={"Effectif ETP"}
        emptyValue="Non disponible"
        sourceCustom={`Gip-Mds / DSN`}
        className="has-no-border"
      />
    );
  }
  return (
    <>
      <>
        <LoadableContent loading={loading} error={error}>
          {effectifsMensuels && (
            <Data
              hasNumberFormat={true}
              name={"Effectif ETP"}
              emptyValue="0"
              className="has-no-border"
              sourceCustom={`Gip-Mds / DSN ${getDateMonthName(
                effectifsMensuels[0]?.periode_concerne
              )} ${getDateYear(effectifsMensuels[0]?.periode_concerne)}`}
              value={effectifsMensuels[0]?.effectif}
            />
          )}
        </LoadableContent>
        {displayedEffectifsCount === MIN_EFFECTIFS_COUNT &&
          effectifsMensuels?.length >= 1 && (
            <AllEffectifsEtp
              text="Afficher l'évolution des effectifs ETP"
              loading={loading}
              onClick={() => setDisplayedEffectifsCount(MAX_EFFECTIF_COUNT)}
            />
          )}
        {displayedEffectifsCount === MAX_EFFECTIF_COUNT && (
          <AllEffectifsEtp
            text="Masquer le détail des effectifs"
            isUp
            loading={loading}
            onClick={() => setDisplayedEffectifsCount(MIN_EFFECTIFS_COUNT)}
          />
        )}
      </>
      {displayedEffectifsCount === MAX_EFFECTIF_COUNT && (
        <>
          {" "}
          <div className="display_table_chart__switch">
            <button
              className="toggle-label "
              onClick={() => setDisplayTable(!displayTable)}
            >
              {!displayTable ? " Affichage Courbe" : "Affichage Tableau"}
            </button>
            <Toggle
              id="display_table_chart-toggle"
              checked={displayTable}
              name="burritoIsReady"
              value={displayTable}
              onChange={handleChange}
            />
          </div>
          <LoadableContent loading={loading} error={error}>
            {!displayTable && effectifsMensuels && (
              <div className="data-sheet--table">
                {" "}
                <NonBorderedTable className="box-shadow" isScrollable>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Effectif ETP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {effectifsMensuels?.map?.(
                      ({ periode_concerne, effectif }) => (
                        <tr key={`${periode_concerne}-effectifsETP`}>
                          <td>{setYearMonthFormat(periode_concerne)}</td>
                          <td>
                            <Value
                              value={effectif}
                              hasNumberFormat={true}
                              empty="0"
                            />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </NonBorderedTable>
              </div>
            )}
          </LoadableContent>
        </>
      )}
      {displayTable &&
        displayedEffectifsCount !== MIN_EFFECTIFS_COUNT &&
        siret && (
          <EffectifGraph
            siret={siret}
            isEtpData
            date={effectifsMensuels[0]?.periode_concerne}
          />
        )}{" "}
    </>
  );
};

EffectifsEtp.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EffectifsEtp;
