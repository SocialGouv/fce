import React from "react";
import PropTypes from "prop-types";
import Toggle from "react-toggle";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

import "react-toggle/style.css";
import "./unsubscribe.scss";

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
              "is-success": !hasError,
              "is-danger": hasError
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
  isSubscribed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  message: PropTypes.string,
  hasError: PropTypes.bool.isRequired
};

export default Unsubscribe;
