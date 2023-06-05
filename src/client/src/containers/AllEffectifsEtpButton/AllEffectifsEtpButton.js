import "./AllEffectifsEtpButton.scss";

import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const AllEffectifsEtpButton = ({ onClick, loading, text, isUp = false }) => {
  return (
    <div className="all_effectifs_etp_button">
      <button
        onClick={onClick}
        className={classNames("is-primary", {
          "is-loading": loading,
        })}
      >
        {text + " "}
        <FontAwesomeIcon icon={isUp ? faCaretUp : faCaretDown} />
      </button>
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
