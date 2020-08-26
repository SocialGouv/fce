import React from "react";
import PropTypes from "prop-types";
import LoginHome from "./steps/LoginHome";
import LoginForm from "./steps/Form";
import "./login.scss";

const Login = ({
  login,
  sendCode,
  hasError,
  errorMessage,
  loading,
  step,
  setStep,
  showSuccessNotif,
  setShowSuccessNotif
}) => {
  return (
    <section className="login px-4">
      {step === "login-home" ? (
        <LoginHome setStep={setStep} />
      ) : (
        <LoginForm
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
      )}
    </section>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  sendCode: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired
};

export default Login;
