import "react-toggle/style.css";
import "./unsubscribe.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Toggle from "react-toggle";
import { CSSTransition } from "react-transition-group";

const Unsubscribe = ({ isSubscribed, handleChange, message, hasError }) => {
  return (
    <section className="mailing-list-subscription">
      <CSSTransition
        in={message}
        timeout={300}
        classNames="transition"
        unmountOnExit
      >
        <div
          className={classNames(
            "notification mailing-list-subscription__notification",
            {
              "is-danger": hasError,
              "is-success": !hasError,
            }
          )}
        >
          {message}
        </div>
      </CSSTransition>
      <div className="control">
        <div className="mailing-list-subscription__switch">
          <label htmlFor="mailing-list-subscription-toggle">
            Je souhaite recevoir des informations par email
          </label>
          <Toggle
            id="mailing-list-subscription-toggle"
            checked={isSubscribed}
            name="burritoIsReady"
            value="yes"
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

Unsubscribe.propTypes = {
  handleChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default Unsubscribe;
