import React from "react";

import "./loadSpinner.scss";

const LoadSpinner = () => {
  return (
    <div className="load-container">
      <div className="spinner">
        <span className="spinner-inner-1" />
        <span className="spinner-inner-2" />
        <span className="spinner-inner-3" />
      </div>
    </div>
  );
};

export default LoadSpinner;
