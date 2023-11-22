import "./dashboard.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import Value from "../../../../shared/Value";

const Item = ({ icon, name, value = "", smallText = false, empty = "-" }) => {
  return (
    <div className="dashboard-item">
      <span className="dashboard-item__header-icon">{icon}</span>
      <div
        className={classNames("dashboard-item__data", {
          "dashboard-item__data--small-text": smallText,
        })}
      >
        <div className="dashboard-item__data__header">
          <span className="dashboard-item__data__header-label">{name}</span>
          <div className="dashboard-item__data__header-value">
            <Value value={value} empty={empty} />
          </div>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  empty: PropTypes.string,
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
