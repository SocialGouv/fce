import PropTypes from "prop-types";
import React, { useState } from "react";
import Toggle from "react-toggle";

import AllEffectifsEtpButton from "../../../../../containers/AllEffectifsEtpButton/AllEffectifsEtpButton";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import { useDsnEffectif } from "./EffectifsDsn.gql";
import EffectifsGraph from "./EffectifsGraph";

const EXPANDED_MAX_EFFECTIFS = 12;
const COLLAPSED_MAX_EFFECTIFS = 1;
const START_DATE = "2018-01";

const EffectifsDsn = ({ siret }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayTable, setDisplayTable] = useState(false);

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
      />
    );
  }
  console.log(effectifs?.[0]?.mois, "date");
  const handleChange = (event) => {
    setDisplayTable(event.target.checked);
  };
  return (
    <LoadableContent loading={loading} error={error}>
      {!isExpanded ? (
        <>
          <Data
            name="Effectif physique"
            value={effectifs?.[0]?.eff}
            nonEmptyValue=""
            sourceSi="DSN"
            hasNumberFormat={true}
          />
          {effectifs?.length >= 1 && (
            <AllEffectifsEtpButton
              text="Afficher l'évolution des effectifs physiques"
              loading={loading}
              onClick={() => setIsExpanded(true)}
            />
          )}
        </>
      ) : (
        !loading && (
          <>
            <Subcategory subtitle="Effectif physique" sourceSi="DSN">
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
              {displayTable && (
                <Table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Effectif Total</th>
                      <th>Homme</th>
                      <th>Femme</th>
                      <th>CDD</th>
                      <th>CDI</th>
                      <th>Total Interim</th>
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
                            empty="-"
                          />
                        </td>
                        <td>
                          <Value
                            hasNumberFormat
                            value={effectif?.hommes}
                            empty="-"
                          />
                        </td>
                        <td>
                          <Value
                            hasNumberFormat
                            value={effectif?.femmes}
                            empty="-"
                          />
                        </td>
                        <td>
                          <Value
                            hasNumberFormat
                            value={effectif?.cdd}
                            empty="-"
                          />
                        </td>
                        <td>
                          <Value
                            hasNumberFormat
                            value={effectif?.cdi}
                            empty="-"
                          />
                        </td>
                        <td>
                          <Value
                            hasNumberFormat
                            value={effectif?.interim}
                            empty="-"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Subcategory>
            {!displayTable && siret && (
              <EffectifsGraph
                isDsnData
                siret={siret}
                date={effectifs?.[0]?.mois}
              />
            )}{" "}
            {isExpanded && (
              <AllEffectifsEtpButton
                text="Afficher moins"
                isUp
                loading={loading}
                onClick={() => setIsExpanded(false)}
              />
            )}
          </>
        )
      )}
    </LoadableContent>
  );
};

EffectifsDsn.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(EffectifsDsn);
