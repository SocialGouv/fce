import React from "react";
import PropTypes from "prop-types";

const HeadForm = ({ step }) => {
  return (
    <>
      <h1 className="login__title has-mb-2">Me connecter</h1>
      {step === "login-form-email" && (
        <>
          <p className="has-mb-1">
            Pour accéder à l{"'"}application FCE, merci de renseigner votre
            adresse électronique (e-mail).
          </p>
          <p className="has-mb-1">
            Vous allez recevoir un code temporaire pour valider votre adresse
            mail,
            <br />
            vérifiez votre boîte de réception
          </p>
        </>
      )}
      {step === "login-form-code" && (
        <>
          <p className="has-mb-1">
            Pour accéder à l{"'"}application FCE, merci de renseigner le code
            envoyé à votre adresse électronique (e-mail).
          </p>
          <p className="has-mb-1">
            Vous recevrez un lien de connexion qui sera valide durant 30 jours.
            <br />
            Passé ce délai vous devrez renouveler votre demande.
          </p>
        </>
      )}
    </>
  );
};

HeadForm.propTypes = {
  step: PropTypes.string.isRequired
};

export default HeadForm;
