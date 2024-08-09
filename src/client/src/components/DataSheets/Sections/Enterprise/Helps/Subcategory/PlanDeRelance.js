import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import Data from "../../../SharedComponents/Data";
import NonBorderedTable from "../../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../../SharedComponents/Subcategory";
import { usePlanRelanceBySiren } from "./PlanDeRelance.gql";

const PlanDeRelance = ({ entreprise }) => {
  const { siren } = entreprise;
  const {
    data: planRelanceData,
    loading,
    error,
  } = usePlanRelanceBySiren(siren);
  const shouldNotRender = useRenderIfSiren({ entreprise, siren });

  if (loading || error || shouldNotRender) {
    return null;
  }

  if (loading || error) {
    return null;
  }

  return (
    <>
      <Subcategory subtitle="Plan de relance" sourceSi="PlanRelance">
        {planRelanceData?.length > 0 && (
          <div className="data-sheet--table">
            <NonBorderedTable isScrollable={planRelanceData?.length > 6}>
              <thead>
                <tr>
                  <th className="th">Date</th>
                  <th className="th">Mesure</th>
                </tr>
              </thead>
              <tbody>
                {planRelanceData.map(({ mesure, date }) => {
                  return (
                    <tr key={`plan-${date}`}>
                      <td className="table-cell--nowrap">{date}</td>
                      <td className="table-cell--nowrap">{mesure}</td>
                    </tr>
                  );
                })}
              </tbody>
            </NonBorderedTable>
          </div>
        )}

        {!planRelanceData ||
          (planRelanceData.length === 0 && (
            <Data
              name="Plan de relance"
              value={"Non"}
              className="has-no-border"
            />
          ))}
      </Subcategory>
    </>
  );
};

PlanDeRelance.propTypes = {
  entreprise: PropTypes.shape({
    siren: PropTypes.string,
  }),
};

export default PlanDeRelance;
