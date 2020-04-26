import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Auth from "../../services/Auth";
import LoginView from "../../components/Login";
import _get from "lodash.get";

const Login = ({ history }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login-home");
  const [showSuccessNotif, setShowSuccessNotif] = useState(true);

  const sendCode = (evt, email) => {
    evt && evt.preventDefault();
    initStates();

    Auth.sendCode(email)
      .then(response => {
        if (!_get(response, "data.success")) {
          throw new Error(_get(response, "data.message"));
        }

        setSuccess();
        setStep("login-form-code");
      })
      .catch(e => {
        setError(e.message || "Le code n'a pas pu être envoyé");
      });
  };

  const login = (evt, email, code) => {
    evt && evt.preventDefault();
    initStates();

    Auth.login(email, code)
      .then(response => {
        if (!_get(response, "data.success")) {
          throw new Error(_get(response, "data.message"));
        }

        history.push("/");
      })
      .catch(e => {
        setError(e.message || "Le code n'a pas pu être envoyé");
      });
  };

  const initStates = () => {
    setHasError(false);
    setLoading(true);
  };

  const setSuccess = () => {
    setHasError(false);
    setLoading(false);
    setShowSuccessNotif(true);
  };

  const setError = message => {
    setHasError(true);
    setErrorMessage(message);
    setLoading(false);
    setShowSuccessNotif(false);
  };

  return (
    <LoginView
      login={login}
      sendCode={sendCode}
      loading={loading}
      hasError={hasError}
      errorMessage={errorMessage}
      step={step}
      setStep={setStep}
      showSuccessNotif={showSuccessNotif}
      setShowSuccessNotif={setShowSuccessNotif}
    />
  );
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default withRouter(Login);
