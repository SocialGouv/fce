import React from "react";
import Button from "../../shared/Button";

const LoginHome = ({ setStep }) => (
  <div className="login__container container">
    <h1 className="login__title is-size-4-touch is-size-3-desktop has-text-weight-bold has-mb-2">
      Retrouvez les informations légales et administratives des entreprises
    </h1>
    <p className="login__subtitle is-size-5-touch is-size-4-desktop has-mb-2">
      L'état civil, l'activité et les données de l'administration dans une seule
      fiche destinée aux agents publics
    </p>
    <p className="has-mb-1">
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

export default LoginHome;
