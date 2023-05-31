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
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table/Table";
import { useEffectifsEtablissementsEtpData } from "./EffectifsEtp.gql";
import EffectifGraph from "./EffectifsGraph";

const MAX_EFFECTIF_COUNT = 24;
const MIN_EFFECTIFS_COUNT = 1;
const start_date = "2018-01-01";
const EffectifsEtp = ({ siret }) => {
  const [displayedEffectifsCount, setDisplayedEffectifsCount] =
    useState(MIN_EFFECTIFS_COUNT);
  const [displayTable, setDisplayTable] = useState(false);

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
  const handleChange = (event) => {
    setDisplayTable(event.target.checked);
  };
  if (!effectifsMensuels || effectifsMensuels.length == 0) {
    return (
      <Data
        name={"Effectif ETP"}
        emptyValue="Non disponible"
        sourceCustom={`Gip-Mds / DSN`}
      />
    );
  }
  return (
    <>
      {displayedEffectifsCount === MIN_EFFECTIFS_COUNT && (
        <>
          <LoadableContent loading={loading} error={error}>
            {effectifsMensuels && (
              <Data
                hasNumberFormat={true}
                name={"Effectif ETP"}
                nonEmptyValue=""
                sourceCustom={`Gip-Mds / DSN ${getDateMonthName(
                  effectifsMensuels[0]?.periode_concerne
                )} ${getDateYear(effectifsMensuels[0]?.periode_concerne)}`}
                value={effectifsMensuels[0]?.effectif}
              />
            )}
          </LoadableContent>
          {effectifsMensuels?.length >= 1 && (
            <AllEffectifsEtp
              text="Afficher tous les effectifs ETP"
              loading={loading}
              onClick={() => setDisplayedEffectifsCount(MAX_EFFECTIF_COUNT)}
            />
          )}
        </>
      )}
      {displayedEffectifsCount === MAX_EFFECTIF_COUNT && (
        <Subcategory subtitle="Effectifs ETP" sourceCustom={`Gip-Mds / DSN`}>
          <div className="display_table_chart__switch">
            <Toggle
              id="display_table_chart-toggle"
              checked={displayTable}
              name="burritoIsReady"
              value={displayTable}
              onChange={handleChange}
            />
            <span className="source" htmlFor="display_table_chart-toggle">
              {!displayTable ? " Afficher Tableau" : " Afficher Courbe"}
            </span>
          </div>
          <LoadableContent loading={loading} error={error}>
            {displayTable && effectifsMensuels && (
              <Table>
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
                            empty="-"
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            )}
          </LoadableContent>
        </Subcategory>
      )}
      {!displayTable &&
        displayedEffectifsCount !== MIN_EFFECTIFS_COUNT &&
        siret && <EffectifGraph siret={siret} isEtpData />}{" "}
      {displayTable && displayedEffectifsCount === MAX_EFFECTIF_COUNT && (
        <AllEffectifsEtp
          text="Afficher moins d'effectifs ETP"
          isUp
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
