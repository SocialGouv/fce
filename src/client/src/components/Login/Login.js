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
    <section className="login section is-paddingless">
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
  login: PropTypes.func,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  updateForm: PropTypes.func,
  loading: PropTypes.bool,
  email: PropTypes.string,
  step: PropTypes.string,
  setStep: PropTypes.func,
  showSuccessNotif: PropTypes.bool,
  setShowSuccessNotif: PropTypes.func
};

export default Login;
