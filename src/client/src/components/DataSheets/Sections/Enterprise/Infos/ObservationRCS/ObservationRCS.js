import React, { useState } from "react";
import PropTypes from "prop-types";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Data from "../../../SharedComponents/Data";
import { toI18nDate, sortByDate } from "../../../../../../helpers/Date";

const ObservationRCS = ({ enterprise }) => {
  const [isShowMore, setIsShowMore] = useState(null);
  const obs = sortByDate(enterprise.rcs_observations || []);

  return (
    <Data
      name="Observations RCS"
      value={
        <ul className="rcs-observations">
          {obs.map(({ date, libelle }, index) => {
            if (index === 0 || isShowMore) {
              return (
                <li
                  key={`rcs-obs-${date}-${libelle}`}
                  className="rcs-observations-item"
                >{`${toI18nDate(date, "L")} - ${libelle}`}</li>
              );
            }
          })}
          {!isShowMore && (
            <div className="is-action-text" onClick={() => setIsShowMore(true)}>
              <FontAwesomeIcon size="xs" icon={faChevronRight} />
              <span className="pl-2">Lire la suite</span>
            </div>
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
