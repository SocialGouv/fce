import React from "react";
import PropTypes from "prop-types";

const HeadForm = ({ step }) => {
  return (
    <div className="login__head-form">
      <h1 className="login__title">Me connecter</h1>
      {step === "login-form-email" && (
        <>
          <p>
            Pour accéder à l{"'"}application FCE, merci de renseigner votre
            adresse électronique (e-mail).
          </p>
          <p>
            Vous allez recevoir un code temporaire pour valider votre adresse
            mail,
            <br />
            vérifiez votre boîte de réception
          </p>
        </>
      )}
      {step === "login-form-code" && (
        <>
          <p>
            Pour accéder à l{"'"}application FCE, merci de renseigner le code
            que vous avez reçu sur votre adresse électronique (e-mail).
          </p>
          <p>
            Votre authentification sera valide 30 jours.
            <br />
            Passé ce délai vous devrez renouveler votre demande.
          </p>
        </>
      )}
    </div>
  );
};

HeadForm.propTypes = {
  step: PropTypes.string.isRequired
};

export default HeadForm;
