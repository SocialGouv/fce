import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Value from "../../../../shared/Value";
import "./dashboard.scss";

const Item = ({ icon, name, value }) => {
  return (
    <div className="dashboard--item">
      <div className="dashboard--item-header">
        <span className="dashboard--item-header--icon">
          <FontAwesomeIcon icon={icon} />
        </span>
        <span className="has-text-roboto has-text-grey-dark has-text-weight-semibold is-size-6">
          {name}
        </span>
      </div>
      <div className="dashboard--item-data has-text-roboto has-text-grey-dark is-size-5">
        <Value value={value} empty="-" />
      </div>
    </div>
  );
};

export default Item;
