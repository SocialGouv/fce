import "./button.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

const LinkButton = ({
  children,
  icon = null,
  faProps = {},
  iconClasses,
  buttonClasses,
  onClick,
  link,
}) => {
  return (
    <a
      href={link}
      className={classNames("button", buttonClasses)}
      onClick={onClick}
    >
      <span className={classNames(["button-icon", `button-icon--after-label`])}>
        <FontAwesomeIcon
          className={classNames(iconClasses)}
          icon={icon}
          {...faProps}
        />
      </span>
      {children}
    </a>
  );
};

LinkButton.propTypes = {
  buttonClasses: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  children: PropTypes.node,
  faProps: PropTypes.object,
  icon: PropTypes.object,
  iconClasses: PropTypes.arrayOf(PropTypes.string),
  link: PropTypes.string,
  onClick: PropTypes.func,
};

export default LinkButton;
