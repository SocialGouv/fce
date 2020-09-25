import React from "react";
import PropTypes from "prop-types";
import Data from "../Data";

const ConditionalData = ({ text, showTable = false }) =>
  showTable ? (
    <dl className="data dl columns">
      <dt className={`dt column`}>{text}</dt>
    </dl>
  ) : (
    <Data
      name={
        <dl>
          <dt>{text}</dt>
        </dl>
      }
      value="Non"
      columnClasses={["is-8", "is-4"]}
    />
  );

ConditionalData.propTypes = {
  text: PropTypes.string.isRequired,
  showTable: PropTypes.bool
};

export default ConditionalData;
