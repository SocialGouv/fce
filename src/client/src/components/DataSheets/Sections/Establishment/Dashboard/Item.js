import "./dashboard.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Value from "../../../../shared/Value";

const Item = ({ icon, name, value = "", smallText = false }) => {
  return (
    <div className="dashboard-item">
      <div className="dashboard-item__header">
        <span className="dashboard-item__header-icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="dashboard-item__header-label">{name}</span>
      </div>
      <div
        className={classNames("dashboard-item__data", {
          "dashboard-item__data--small-text": smallText,
        })}
      >
        <Value value={value} empty="-" />
      </div>
    </div>
  );
};

Item.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  smallText: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number,
    PropTypes.element,
  ]),
};

export default Item;
