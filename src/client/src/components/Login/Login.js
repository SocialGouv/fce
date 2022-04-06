import "./login.scss";

import PropTypes from "prop-types";
import React from "react";

import LoginForm from "./steps/Form";

const Login = ({
  login,
  sendCode,
  errorMessage,
  infoMessage,
  loading,
  step,
  setStep,
  showSuccessNotif,
  setShowSuccessNotif,
  showMailingListSignup,
}) => {
  return (
    <section className="login">
      <LoginForm
        login={login}
        sendCode={sendCode}
        loading={loading}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
        step={step}
        setStep={setStep}
        showSuccessNotif={showSuccessNotif}
        setShowSuccessNotif={setShowSuccessNotif}
        showMailingListSignup={showMailingListSignup}
      />
    </section>
  );
};

Login.propTypes = {
  errorMessage: PropTypes.string,
  infoMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  sendCode: PropTypes.func.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  showMailingListSignup: PropTypes.bool.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
};

export default Login;
