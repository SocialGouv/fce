import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import PropTypes from "prop-types";

const Button = ({ value, icon, buttonClasses, callback }) => {
  return (
    <button
      className={`button has-text-weight-semibold ${buttonClasses &&
        ClassNames(buttonClasses)}`}
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
  value: "Valider",
  buttonClasses: "button"
};

Button.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.oneOfType([null, PropTypes.object]),
  buttonClasses: PropTypes.array,
  callback: PropTypes.func
};

export default Button;
