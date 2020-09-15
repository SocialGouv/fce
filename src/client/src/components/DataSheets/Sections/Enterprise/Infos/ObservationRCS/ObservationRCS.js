import React, { useState } from "react";
import PropTypes from "prop-types";
import { faChevronRight, faChevronUp } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Data from "../../../SharedComponents/Data";
import { toI18nDate, sortByDate } from "../../../../../../helpers/Date";

import "./observationsRcs.scss";

const ObservationRCS = ({ enterprise }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const obs = sortByDate(enterprise.rcs_observations || []);
  const firstObs = obs[0];

  return (
    <Data
      name="Observations RCS"
      value={
        <ul className="rcs-observations">
          {isExpanded ? (
            obs.map(({ date, libelle }) => (
              <li
                key={`rcs-obs-${date}-${libelle}`}
                className="rcs-observations__item"
              >{`${toI18nDate(date)} - ${libelle}`}</li>
            ))
          ) : (
            <li
              key={`rcs-obs-${firstObs.date}-${firstObs.libelle}`}
              className="rcs-observations__item"
            >{`${toI18nDate(firstObs.date, "L")} - ${firstObs.libelle}`}</li>
          )}

          {obs.length > 1 && (
            <button
              className="is-text-button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronRight}
                size="xs"
              />
              <span className="rcs-observations__see-more-label">
                {isExpanded ? "Replier" : "Lire la suite"}
              </span>
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
