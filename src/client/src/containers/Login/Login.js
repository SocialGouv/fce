import React, { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Local } from "OhMyCache";
import Auth from "../../services/Auth";
import LoginView from "../../components/Login";
import _get from "lodash.get";

const AUTH_KEY = "fce_token";

const Login = ({ history }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login-home");
  const [showSuccessNotif, setShowSuccessNotif] = useState(true);

  const sendCode = (evt, email) => {
    evt && evt.preventDefault();
    _initStates();

    Auth.sendCode(email)
      .then(response => {
        if (response.data && response.data.success) {
          _sendSuccess();
          setStep("login-form-code");
        } else {
          _sendFail(
            _get(response, "data.message", "Le code n'a pas pu être envoyé")
          );
        }
      })
      .catch(() => {
        _sendFail("Le code n'a pas pu être envoyé");
      });
  };

  const login = (evt, email, code) => {
    evt && evt.preventDefault();
    _initStates();

    Auth.login(email, code)
      .then(response => {
        if (response.data && response.data.success) {
          Local.set(AUTH_KEY, response.data.token);
          history.push("/");
        } else {
          _sendFail(
            _get(response, "data.message", "La tentative de connexion a échoué")
          );
        }
      })
      .catch(e => {
        console.log(e);
        _sendFail("La tentative de connexion a échoué");
      });
  };

  const _initStates = () => {
    setHasError(false);
    setLoading(true);
  };

  const _sendSuccess = () => {
    setHasError(false);
    setLoading(false);
    setShowSuccessNotif(true);
  };

  const _sendFail = message => {
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
