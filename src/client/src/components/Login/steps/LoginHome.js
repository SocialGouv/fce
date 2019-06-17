import React from "react";
import PropTypes from "prop-types";
import Button from "../../shared/Button";

const LoginHome = ({ setStep }) => (
  <div className="login__container container">
    <h1 className="login__title">
      Retrouvez les informations légales et administratives des entreprises
    </h1>
    <p className="login__subtitle">
      L'état civil, l'activité et les données de l'administration dans une seule
      fiche destinée aux agents publics
    </p>
    <p className="login__info has-mb-1">
      Ce service est destiné aux agents de service public.
      <br />
      Pour y accéder veuillez vous identifier.
    </p>
    <Button
      value="Me connecter"
      buttonClasses="login__button is-secondary"
      callback={() => {
        setStep("login-form");
      }}
    />
  </div>
);

LoginHome.propTypes = {
  setStep: PropTypes.func.isRequired
};

export default LoginHome;
