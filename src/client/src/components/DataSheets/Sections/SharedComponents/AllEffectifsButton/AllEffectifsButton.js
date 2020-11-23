import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../../../../shared/Button";

import "./allEffectifsButton.scss";

const AllEffectifsButton = ({ getAllEffectifs, value, isLoading }) => {
  return (
    <div className="all-effectifs-etp-button">
      <Button
        onClick={getAllEffectifs}
        value={value}
        buttonClasses={classNames("is-primary", {
          "is-loading": isLoading
        })}
      />
    </div>
  );
};

AllEffectifsButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  getAllEffectifs: PropTypes.func.isRequired
};

export default AllEffectifsButton;
