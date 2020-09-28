import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";

import "./button.scss";

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
      className={classNames("button", buttonClasses)}
      onClick={callback}
      disabled={isDisabled}
      {...props}
    >
      {rowReverse && <span>{value}</span>}
      {icon && (
        <span
          className={classNames([
            "button-icon",
            `button-icon--${rowReverse ? "before" : "after"}-label`
          ])}
        >
          <FontAwesomeIcon className={classNames(iconClasses)} icon={icon} />
        </span>
      )}
      {!rowReverse && <span>{value}</span>}
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
