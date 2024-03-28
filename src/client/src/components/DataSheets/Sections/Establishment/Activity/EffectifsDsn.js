import "react-toggle/style.css";

import PropTypes from "prop-types";
import React, { useState } from "react";
import Toggle from "react-toggle";

import AllEffectifsEtpButton from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable";
import { useDsnEffectif } from "./EffectifsDsn.gql";
import EffectifsGraph from "./EffectifsGraph";

const EXPANDED_MAX_EFFECTIFS = 60;
const COLLAPSED_MAX_EFFECTIFS = 1;
const START_DATE = "2018-01";

const EffectifsDsn = ({ siret }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayTable, setDisplayTable] = useState(true);

  const {
    loading,
    error,
    data: effectifs,
  } = useDsnEffectif(
    siret,
    {
      limit: isExpanded ? EXPANDED_MAX_EFFECTIFS : COLLAPSED_MAX_EFFECTIFS,
    },
    { mois: "desc" },
    START_DATE
  );

  if (!effectifs || effectifs.length == 0) {
    return (
      <Data
        name={"Effectif physique"}
        emptyValue="Non disponible"
        sourceCustom={`Gip-Mds / DSN`}
        className="has-no-border"
      />
    );
  }

  const handleChange = (event) => {
    setDisplayTable(event.target.checked);
  };

  return (
    <LoadableContent loading={loading} error={error}>
      <>
        <Data
          name="Effectif physique"
          value={effectifs?.[0]?.eff}
          nonEmptyValue=""
          sourceSi="DSN"
          className="has-no-border"
          hasNumberFormat={true}
        />
        {!isExpanded && effectifs?.length >= 1 && (
          <AllEffectifsEtpButton
            text="Afficher l'évolution des effectifs physiques"
            loading={loading}
            onClick={() => setIsExpanded(true)}
          />
        )}
        {isExpanded && (
          <AllEffectifsEtpButton
            text="Masquer le détail des effectifs"
            isUp
            loading={loading}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </>
      {!loading && isExpanded && (
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
          {!displayTable && (
            <div className="data-sheet--table">
              <NonBorderedTable className="box-shadow" isScrollable>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Effectif Total</th>
                    <th>Homme</th>
                    <th>Femme</th>
                    <th>CDD</th>
                    <th>CDI</th>
                    <th>Total Interim</th>
                    <th>Apprenti</th>
                  </tr>
                </thead>
                <tbody>
                  {effectifs?.map?.((effectif) => (
                    <tr key={`effectif-${effectif?.id}`}>
                      <td>{effectif?.mois}</td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.eff}
                          empty="0"
                        />
                      </td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.hommes}
                          empty="0"
                        />
                      </td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.femmes}
                          empty="0"
                        />
                      </td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.cdd}
                          empty="0"
                        />
                      </td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.cdi}
                          empty="0"
                        />
                      </td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.interim}
                          empty="0"
                        />
                      </td>
                      <td>
                        <Value
                          hasNumberFormat
                          value={effectif?.apprenti}
                          empty="0"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </NonBorderedTable>
            </div>
          )}
          {displayTable && (
            <EffectifsGraph
              date={effectifs?.[0]?.mois}
              isDsnData
              siret={siret}
            />
          )}{" "}
        </>
      )}
    </LoadableContent>
  );
};

EffectifsDsn.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifsDsn);
