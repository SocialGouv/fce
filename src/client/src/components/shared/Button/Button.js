import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Button = ({ value, icon, buttonClasses, callback }) => {
  return (
    <button
      className={`button has-text-weight-semibold ${buttonClasses}`}
      onClick={callback}
    >
      {icon && (
        <span className="icon">
          <FontAwesomeIcon icon={icon} />
        </span>
      )}
      <span>{value}</span>
    </button>
  );
};

Button.defaultProps = {
  value: "Click me",
  icon: false,
  buttonClasses: "button"
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  buttonClasses: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired
};

export default Button;
