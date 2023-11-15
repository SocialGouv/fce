import PropTypes from "prop-types";
import React from "react";

import ArrowDown from "../../../../shared/Icons/ArrowDown.jsx";
import ArrowUp from "../../../../shared/Icons/ArrowUp.jsx";

const BlocTitle = ({ text, isOpen = false, toggleAccordion }) => {
  return (
    <div
      className="section-header"
      onClick={() => toggleAccordion()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          toggleAccordion();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isOpen}
    >
      <h2 className="dark-blue-title">{text}</h2>
      <button className="icon" onClick={() => toggleAccordion()}>
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
    </div>
  );
};

BlocTitle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  toggleAccordion: PropTypes.func,
};

export default BlocTitle;
