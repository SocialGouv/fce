import PropTypes from "prop-types";
import React, { useState } from "react";
import Toggle from "react-toggle";

import AllEffectifsEtpButton from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import {
  getDateMonthName,
  getDateYear,
  sortByPeriode,
} from "../../../../../helpers/Date";
import { useRenderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import EffectifGraph from "./EffectifGraph";
import { useEffectifsMensuels } from "./EnterpriseInfos.gql";

const MIN_EFFECTIFS_MENSUELS = 1;
const MAX_EFFECTIFS_MENSUELS = 24;
const Effectis = ({ siren }) => {
  const [effectifsMensuelsLimit, setEffectifsMensuelsLimit] = useState(
    MIN_EFFECTIFS_MENSUELS
  );
  const [displayTable, setDisplayTable] = useState(false);

  const {
    data: effectifsMensuels,
    loading: effectifsMensuelsLoading,
    error: effectifsMensuelsError,
  } = useEffectifsMensuels(siren, effectifsMensuelsLimit);
  const handleChange = (event) => {
    setDisplayTable(event.target.checked);
  };
  const shouldNotRender = useRenderIfSiren({ siren });

  if (shouldNotRender) {
    return null;
  }
  if (!effectifsMensuels || effectifsMensuels.length == 0) {
    return (
      <Data
        name={"Effectif  Etp annuels"}
        emptyValue="Non disponible"
        sourceSi="DSN"
        className="has-no-border"
      />
    );
  }
  const EffectifEtpDataComponents =
    effectifsMensuels.length > 0 ? (
      <Data
        name={`Effectif ETP annuel`}
        value={effectifsMensuels[0]?.effectif}
        className="has-no-border"
        sourceCustom={`Gip-Mds / DSN ${getDateMonthName(
          effectifsMensuels[0]?.periode_concerne
        )} ${getDateYear(effectifsMensuels[0]?.periode_concerne)}`}
        hasNumberFormat
      />
    ) : (
      <Data
        name={"Effectif  Etp annuels"}
        emptyValue="Non disponible"
        sourceSi="DSN"
        className="has-no-border"
      />
    );

  return (
    <LoadableContent
      loading={effectifsMensuelsLoading}
      error={effectifsMensuelsError}
    >
      <>
        {EffectifEtpDataComponents}

        {effectifsMensuelsLimit === MIN_EFFECTIFS_MENSUELS &&
          effectifsMensuels?.length >= 1 && (
            <AllEffectifsEtpButton
              text="Afficher l'évolution des effectifs physiques"
              loading={effectifsMensuelsLoading}
              onClick={() => setEffectifsMensuelsLimit(MAX_EFFECTIFS_MENSUELS)}
            />
          )}
        {effectifsMensuelsLimit === MAX_EFFECTIFS_MENSUELS && (
          <AllEffectifsEtpButton
            text="Masquer le détail des effectifs"
            isUp
            loading={effectifsMensuelsLoading}
            onClick={() => setEffectifsMensuelsLimit(MIN_EFFECTIFS_MENSUELS)}
          />
        )}
      </>

      {!effectifsMensuelsLoading &&
        effectifsMensuelsLimit === MAX_EFFECTIFS_MENSUELS && (
          <>
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
            {displayTable && (
              <div className="data-sheet--table">
                <NonBorderedTable className="box-shadow">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Effectif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {effectifsMensuels?.map?.((effectif) => (
                      <tr key={`effectif-${effectif?.id}`}>
                        <td>
                          <Value value={effectif?.periode_concerne} empty="-" />
                        </td>
                        <td>
                          <Value
                            hasNumberFormat
                            value={effectif?.effectif}
                            empty="-"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </NonBorderedTable>
              </div>
            )}
            {!displayTable && effectifsMensuels && (
              <div className="box-shadow">
                <EffectifGraph chartData={sortByPeriode(effectifsMensuels)} />
              </div>
            )}
          </>
        )}
    </LoadableContent>
  );
};

Effectis.propTypes = {
  siren: PropTypes.string.isRequired,
};

export default Effectis;
