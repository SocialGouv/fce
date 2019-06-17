import React from "react";
import PropTypes from "prop-types";
import LoginHome from "./steps/LoginHome";
import LoginForm from "./steps/LoginForm";
import "./login.scss";

const Login = ({
  login,
  hasError,
  errorMessage,
  updateForm,
  loading,
  email,
  step,
  setStep,
  showSuccessNotif,
  setShowSuccessNotif
}) => {
  return (
    <section className="login">
      {step === "login-home" ? (
        <LoginHome setStep={setStep} />
      ) : (
        <LoginForm
          login={login}
          updateForm={updateForm}
          loading={loading}
          hasError={hasError}
          errorMessage={errorMessage}
          email={email}
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
  hasError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  updateForm: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string,
  step: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired
};

export default Login;
