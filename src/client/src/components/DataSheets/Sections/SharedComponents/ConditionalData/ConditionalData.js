import PropTypes from "prop-types";
import React from "react";

import Data from "../Data";

const ConditionalData = ({ text, showTable = false, className = "" }) =>
  showTable ? (
    <dl className={`data dl columns ${className}`}>
      <dt className={`dt column dt-title`}>{text}</dt>
    </dl>
  ) : (
    <Data
      name={
        <dl>
          <dt className="dt-title">{text}</dt>
        </dl>
      }
      value="Non"
      className={className}
      columnClasses={["is-8", "is-4"]}
    />
  );

ConditionalData.propTypes = {
  className: PropTypes.string,
  showTable: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default ConditionalData;
