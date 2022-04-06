import "./allEffectifsButton.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Button from "../../../../shared/Button";

const AllEffectifsButton = ({ getAllEffectifs, value, isLoading }) => {
  return (
    <div className="all-effectifs-etp-button">
      <Button
        onClick={getAllEffectifs}
        value={value}
        buttonClasses={classNames("is-primary", {
          "is-loading": isLoading,
        })}
      />
    </div>
  );
};

AllEffectifsButton.propTypes = {
  getAllEffectifs: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default AllEffectifsButton;
