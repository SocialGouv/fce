import "./button.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const Button = ({
  value = "Valider",
  icon = null,
  faProps = {},
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
            `button-icon--${rowReverse ? "before" : "after"}-label`,
          ])}
        >
          <FontAwesomeIcon
            className={classNames(iconClasses)}
            icon={icon}
            {...faProps}
          />
        </span>
      )}
      {!rowReverse && <span>{value}</span>}
    </button>
  );
};

Button.propTypes = {
  buttonClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  callback: PropTypes.func,
  faProps: PropTypes.object,
  icon: PropTypes.object,
  iconClasses: PropTypes.arrayOf(PropTypes.string),
  isDisabled: PropTypes.bool,
  rowReverse: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Button;
