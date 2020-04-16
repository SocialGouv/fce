import React, { useState } from "react";
import PropTypes from "prop-types";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Data from "../../../SharedComponents/Data";
import { toI18nDate, sortByDate } from "../../../../../../helpers/Date";

const ObservationRCS = ({ enterprise }) => {
  const [isExpanded, setIsExpanded] = useState(null);
  const obs = sortByDate(enterprise.rcs_observations || []);
  const firstObs = obs[0];

  return (
    <Data
      name="Observations RCS"
      value={
        <ul className="rcs-observations">
          {isExpanded ? (
            obs.map(({ date, libelle }, index) => {
              if (index === 0 || isExpanded) {
                return (
                  <li
                    key={`rcs-obs-${date}-${libelle}`}
                    className="rcs-observations-item"
                  >{`${toI18nDate(date)} - ${libelle}`}</li>
                );
              }
            })
          ) : (
            <li
              key={`rcs-obs-${firstObs.date}-${firstObs.libelle}`}
              className="rcs-observations-item"
            >{`${toI18nDate(firstObs.date, "L")} - ${firstObs.libelle}`}</li>
          )}
          {obs.length > 1 && !isExpanded && (
            <button
              className="is-text-button"
              onClick={() => setIsExpanded(true)}
            >
              <FontAwesomeIcon icon={faChevronRight} size="xs" />
              <span className="pl-2">Lire la suite</span>
            </button>
          )}
        </ul>
      }
    />
  );
};

ObservationRCS.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default ObservationRCS;
