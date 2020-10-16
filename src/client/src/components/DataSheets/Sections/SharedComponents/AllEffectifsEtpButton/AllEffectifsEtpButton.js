import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../../../../shared/Button";

import "./allEffectifsEtpButton.scss";

const AllEffectifsEtpButton = ({ getAllEffectifsEtp, isLoading }) => {
  return (
    <div className="all-effectifs-etp-button">
      <Button
        onClick={getAllEffectifsEtp}
        value="Afficher tous les effectifs ETP"
        buttonClasses={classNames("is-primary", {
          "is-loading": isLoading
        })}
      />
    </div>
  );
};

AllEffectifsEtpButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  getAllEffectifsEtp: PropTypes.func.isRequired
};

export default AllEffectifsEtpButton;
