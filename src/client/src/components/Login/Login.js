import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./steps/Form";
import "./login.scss";

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
  showMailingListSignup
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
  login: PropTypes.func.isRequired,
  sendCode: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  infoMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired,
  showMailingListSignup: PropTypes.bool.isRequired
};

export default Login;
