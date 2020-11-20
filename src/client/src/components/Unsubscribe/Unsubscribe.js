import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Toggle from "react-toggle";

import "react-toggle/style.css";
import "./unsubscribe.scss";

const Unsubscribe = ({ isSubscribed, handleChange }) => {
  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <div className="control mailing-list-subscription">
      <span>Je souhaite recevoir des informations par email</span>
      <Toggle
        checked={isSubscribed}
        name="burritoIsReady"
        value="yes"
        onChange={handleChange}
      />
    </div>
  );
};

Unsubscribe.propTypes = {
  isSubscribed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Unsubscribe;
