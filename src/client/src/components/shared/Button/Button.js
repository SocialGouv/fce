import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import PropTypes from "prop-types";

const Button = ({
  value,
  icon,
  iconClasses,
  rowReverse,
  buttonClasses,
  callback,
  isDisabled
}) => {
  return (
    <button
      className={ClassNames("button", buttonClasses)}
      onClick={callback}
      disabled={isDisabled}
    >
      {rowReverse && <span className="pr-2">{value}</span>}
      {icon && (
        <span className="icon">
          <FontAwesomeIcon className={ClassNames(iconClasses)} icon={icon} />
        </span>
      )}
      {!rowReverse && <span className="pl-2">{value}</span>}
    </button>
  );
};

Button.defaultProps = {
  value: "Valider",
  icon: null,
  rowReverse: false,
  isDisabled: false
};

Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.oneOfType([null, PropTypes.object]),
  buttonClasses: PropTypes.arrayOf(PropTypes.string),
  callback: PropTypes.func,
  rowReverse: PropTypes.bool,
  iconClasses: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool
};

export default Button;
