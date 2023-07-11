import "./AllEffectifsEtpButton.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import ArrowDown from "../../components/shared/Icons/ArrowDown.jsx";
import ArrowUp from "../../components/shared/Icons/ArrowUp.jsx";

const AllEffectifsEtpButton = ({ onClick, loading, text, isUp = false }) => {
  return (
    <div className="all_effectifs_etp_button is-link-text">
      <button
        onClick={onClick}
        className={classNames("is-primary", {
          "is-loading": loading,
        })}
      >
        {text + " "}
      </button>
      <span className="icon">{isUp ? <ArrowUp /> : <ArrowDown />}</span>
    </div>
  );
};

AllEffectifsEtpButton.propTypes = {
  isUp: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AllEffectifsEtpButton;
