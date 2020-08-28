import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  value = "Valider",
  icon = null,
  rowReverse = false,
  isDisabled = false,
  iconClasses,
  buttonClasses,
  callback,
  ...props
}) => {
  return (
    <button
      className={ClassNames("button", buttonClasses)}
      onClick={callback}
      disabled={isDisabled}
      {...props}
    >
      {rowReverse && <span className="pr-2">{value}</span>}
      {icon && (
        <span className="button-icon">
          <FontAwesomeIcon className={ClassNames(iconClasses)} icon={icon} />
        </span>
      )}
      {!rowReverse && <span className="pl-2">{value}</span>}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.object,
  buttonClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  callback: PropTypes.func,
  rowReverse: PropTypes.bool,
  iconClasses: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool
};

export default Button;
