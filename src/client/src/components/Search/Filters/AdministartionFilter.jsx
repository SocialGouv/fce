import "./AdministartionFilter.scss";

import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import ArrowDown from "../../shared/Icons/ArrowDown.jsx";

const AdministartionFilter = ({
  onFromSubmit,
  removeFilters,
  label,
  children,
  customFilters,
  addSaveClearButton = true,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const handleSubmit = (e) => {
    setShowMenu(!showMenu);
    onFromSubmit(e);
  };

  const onToggleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowMenu(false);
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { onToggleMenu })
  );
  return (
    <div className="custom-dropdown" id="custom-dropdown" ref={dropdownRef}>
      <div className="control select-control-field">
        <button className="custom-dropdown-button" onClick={onToggleMenu}>
          {label}
          <span>
            <ArrowDown size={18} color="#161616" />
          </span>
        </button>
      </div>
      {showMenu && (
        <button onClick={() => setShowMenu(false)} className="close-menu">
          Fermer ✕
        </button>
      )}
      {showMenu && (
        <div className="custom-dropdown-menu">
          <div className="custom-dropdown-menu-filters">
            {" "}
            {childrenWithProps}
          </div>
          {addSaveClearButton && (
            <div className="custom-dropdown-control-btns">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeFilters(customFilters);
                  setShowMenu(!showMenu);
                }}
              >
                Supprimer
              </button>
              <button
                className="bordered"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Appliquer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

AdministartionFilter.propTypes = {
  addSaveClearButton: PropTypes.bool,
  children: PropTypes.node,
  customFilters: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  onFromSubmit: PropTypes.func,
  removeFilters: PropTypes.func.isRequired,
};

export default AdministartionFilter;
