import { getYear, subYears } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

import { getCustomPastYear } from "../../../../../../helpers/Date/Date";
import { renderIfSiret } from "../../../../../../helpers/hoc/renderIfSiret";
import { formatNumber } from "../../../../../../helpers/utils";
import {
  getBreakCounts,
  getDataAfterYear,
  getSignCounts,
  getSignesTotalFromSignes,
} from "../../../../../../utils/apprentissage/apprentissage";
import LoadableContent from "../../../../../shared/LoadableContent/LoadableContent";
import Data from "../../../SharedComponents/Data";
import NonBorderedTable from "../../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../../SharedComponents/Subcategory";
import { useApprentissageData } from "./Apprentissage.gql";

const LAST_3_YEARS = [
  getYear(subYears(new Date(), 2)),
  getYear(subYears(new Date(), 1)),
  getYear(new Date()),
];

const displayedYears = LAST_3_YEARS;

const Apprentissage = ({ siret }) => {
  const { loading, data, error } = useApprentissageData(siret);
  const minYear = getCustomPastYear(2);
  const dataAfterMinYear = getDataAfterYear(data || [], minYear);
  const apprentissagesSignes = getSignCounts(dataAfterMinYear || []);
  const apprentissagesRompus = getBreakCounts(dataAfterMinYear || []);

  return (
    <Subcategory subtitle="Apprentissage">
      <LoadableContent loading={loading} error={error}>
        <Data
          name={`Embauche en contrat d'apprentissage depuis ${minYear}`}
          value={getSignesTotalFromSignes(apprentissagesSignes)}
          columnClasses={["is-7", "is-5"]}
          sourceSi="DECA"
          className="has-no-border"
        />
        {data?.length > 0 && (
          <div className="data-sheet--table">
            <NonBorderedTable>
              <thead>
                <tr>
                  <th />
                  {displayedYears.map((year) => (
                    <th className="has-text-right" key={year}>
                      {year}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Nombre de contrats d{`'`}apprentissage signés</th>
                  {displayedYears.map((year) => (
                    <td className="has-text-right" key={`signes-${year}`}>
                      {(apprentissagesSignes[year] &&
                        formatNumber(apprentissagesSignes[year])) ||
                        0}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th>Nombre de contrats rompus </th>
                  {displayedYears.map((year) => (
                    <td className="has-text-right" key={`rompus-${year}`}>
                      {(apprentissagesRompus[year] &&
                        formatNumber(apprentissagesRompus[year])) ||
                        0}
                    </td>
                  ))}
                </tr>
              </tbody>
            </NonBorderedTable>
          </div>
        )}
      </LoadableContent>
    </Subcategory>
  );
};

Apprentissage.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default renderIfSiret(Apprentissage);
