import "./observationsRcs.scss";

import { faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reverse, sortBy } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { toI18nDate } from "../../../../../../helpers/Date";
import Data from "../../../SharedComponents/Data";

const ObservationRCS = ({ observations }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const obs = reverse(sortBy(observations, "date_timestamp"));
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
              className="rcs-observations__button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <FontAwesomeIcon
                icon={isExpanded ? faChevronUp : faChevronRight}
                size="xs"
              />
              <span className="rcs-observations__button-label">
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
  observations: PropTypes.array.isRequired,
};

export default ObservationRCS;
