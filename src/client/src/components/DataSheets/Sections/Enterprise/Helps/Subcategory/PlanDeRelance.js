import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import Table from "../../../SharedComponents/Table/Table";
import { usePlanRelanceBySiren } from "./PlanDeRelance.gql";

const PlanDeRelance = ({ entreprise: { siren } }) => {
  const {
    data: planRelanceData,
    loading,
    error,
  } = usePlanRelanceBySiren(siren);

  if (loading || error) {
    return null;
  }

  return (
    <>
      <Subcategory subtitle="Plan de relance" sourceSi="PlanRelance">
        {planRelanceData?.length > 0 && (
          <Table>
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
          </Table>
        )}

        {!planRelanceData ||
          (planRelanceData.length === 0 && (
            <Data name="Plan de relance" value={"Non"} />
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

export default renderIfSiren(PlanDeRelance);
