import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Value from "../../../../shared/Value";

const SuccessionData = ({ name, values }) => (
  <div className="data dl columns has-no-border">
    <div className="column">
      <div className="dt dt-title">{name} (Date Succession)</div>
    </div>
    <div className="dd column">
      <div>
        {values.map(({ siret, dateliensuccession }, index) => (
          <div key={index} className="is-link-text ">
            <Link to={`/establishment/${siret}`}>
              <Value value={siret} />
            </Link>{" "}
            <span className="date-text">
              ({dateliensuccession ? <Value value={dateliensuccession} /> : ""})
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

SuccessionData.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
};

export default SuccessionData;
