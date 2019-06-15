import React from "react";
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

export default Login;
