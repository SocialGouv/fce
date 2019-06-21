import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Value from "../../../../shared/Value";
import PropTypes from "prop-types";
import "./dashboard.scss";

const Item = ({ icon, name, value }) => {
  return (
    <div className="dashboard-item">
      <div className="dashboard-item--header">
        <span className="dashboard-item--header-icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="has-text-roboto has-text-grey-dark has-text-weight-semibold is-size-6">
          {name}
        </span>
      </div>
      <div className="flex-center dashboard-item-data">
        <div className="has-text-roboto has-text-grey-dark is-size-5">
          <Value value={value} empty="-" />
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.number
  ])
};

export default Item;
