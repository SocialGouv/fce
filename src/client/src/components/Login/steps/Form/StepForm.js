import React from "react";
import PropTypes from "prop-types";
import ClassNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/pro-solid-svg-icons";

import Button from "../../../shared/Button";

export const StepForm = ({
  inputLabel = "",
  inputValue,
  onChangeCallback,
  buttonText = "Me connecter",
  errorMessage = "",
  hasError = false,
  loading = false,
  submitCallback
}) => {
  return (
    <form className="login-form has-mt-2" onSubmit={submitCallback}>
      {hasError && (
        <div className="login__notif login__notif--error has-mb-1 shake-horizontal">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="field">
        <label htmlFor={inputLabel} className="label">
          {inputLabel}
        </label>
        <div className="control">
          <input
            id={inputLabel}
            type={inputLabel}
            name={inputLabel}
            className="input"
            required
            value={inputValue}
            onChange={e => onChangeCallback(e.target.value)}
          />
        </div>
      </div>
      <Button
        value={buttonText}
        buttonClasses={ClassNames("login__button", "is-secondary", {
          "is-loading": loading
        })}
      />
    </form>
  );
};

StepForm.propTypes = {
  inputLabel: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  loading: PropTypes.bool,
  submitCallback: PropTypes.func.isRequired,
  onChangeCallback: PropTypes.func.isRequired
};

export default StepForm;
