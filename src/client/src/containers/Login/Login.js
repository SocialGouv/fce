import _get from "lodash.get";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginView from "../../components/Login";
import { UserContext } from "../../components/Login/UserContext";
import Auth from "../../services/Auth";

const Login = () => {
  const [step, setStep] = useState("login-form-email");
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessNotif, setShowSuccessNotif] = useState(true);
  const [showMailingListSignup, setShowMailingListSignup] = useState(true);
  const redirectLoginSuccess = "/search";
  const isLogged = Auth.isLogged();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (isLogged || user) navigate("/");
  }, [isLogged, user]);

  const sendCode = (e, email) => {
    e.preventDefault();
    initStates();

    Auth.sendCode(email)
      .then((response) => {
        if (!_get(response, "data.success")) {
          throw new Error(_get(response, "data.message"));
        }

        setSuccess();
        setShowMailingListSignup(
          !_get(response, "data.isSubscribedToMailingList")
        );
        setStep("login-form-code");
      })
      .catch((e) => {
        const errorCode = _get(e, "response.data.code", "");
        if (errorCode === "HAS_VALID_CODE") {
          setSuccess();
          setShowSuccessNotif(false);
          setInfoMessage(`Un code a déjà été envoyé à l'addresse ${email}. La réception peut \
prendre plusieurs minutes dans certains services.`);
          setStep("login-form-code");
          return;
        }
        const message = _get(e, "response.data.error", e.message);
        setError(message || "Le code n'a pas pu être envoyé");
      });
  };

  const login = (e, email, code, isCheckedSubscription) => {
    e.preventDefault();
    initStates();

    Auth.login(email, code, isCheckedSubscription)
      .then((response) => {
        if (!_get(response, "data.success")) {
          throw new Error(_get(response, "data.message"));
        }

        navigate(redirectLoginSuccess);
      })
      .catch((e) => {
        const message = _get(e, "response.data.error", e.message);
        setError(message || "Le code n'a pas pu être envoyé");
      });
  };

  const initStates = () => {
    setErrorMessage(null);
    setLoading(true);
  };

  const setSuccess = () => {
    setErrorMessage(null);
    setLoading(false);
    setShowSuccessNotif(true);
  };

  const setError = (message) => {
    setErrorMessage(message);
    setLoading(false);
    setShowSuccessNotif(false);
  };

  return (
    <LoginView
      login={login}
      sendCode={sendCode}
      loading={loading}
      infoMessage={infoMessage}
      errorMessage={errorMessage}
      step={step}
      setStep={setStep}
      showSuccessNotif={showSuccessNotif}
      setShowSuccessNotif={setShowSuccessNotif}
      showMailingListSignup={showMailingListSignup}
    />
  );
};

export default Login;
