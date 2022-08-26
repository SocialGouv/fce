import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Value from "../../../../shared/Value";

const SuccessionData = ({ name, values }) => (
  <div className="data dl columns">
    <div className="column">
      <div className="dt">{name} (Date Succession)</div>
    </div>
    <div className="dd column">
      <div>
        {values.map(({ siret, dateliensuccession }, index) => (
          <div key={index}>
            <Link to={`/establishment/${siret}`}>
              <Value value={siret} />
            </Link>{" "}
            ({dateliensuccession ? <Value value={dateliensuccession} /> : ""})
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
