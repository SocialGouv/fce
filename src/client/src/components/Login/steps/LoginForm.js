import React from "react";
import PropTypes from "prop-types";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle
} from "@fortawesome/fontawesome-pro-solid";
import ClassNames from "classnames";
import Button from "../../shared/Button";
import Config from "../../../services/Config";

const LoginForm = ({
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
}) => (
  <div className="login__container login__container--form container">
    <div>
      <h1 className="login__title has-mb-2">Me connecter</h1>
      <p className="has-mb-1">
        Pour accéder à l'application FCE, merci de renseigner votre adresse
        électronique (e-mail).
      </p>
      <p className="has-mb-1">
        Vous recevrez un lien de connexion qui sera valide durant 30 jours.
        <br />
        Passé ce délai vous devrez renouveler votre demande.
      </p>
      {step === "login-form" && (
        <form className="login-form has-mt-2" onSubmit={login}>
          {hasError && (
            <div className="login__notif login__notif--error has-mb-1 shake-horizontal">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="field">
            <label htmlFor="email" className="label">
              Adresse électronique (e-mail)
            </label>
            <div className="control">
              <input
                id="email"
                type="email"
                name="email"
                className="input"
                required
                value={email ? email : ""}
                onChange={evt => updateForm(evt)}
              />
            </div>
          </div>
          <Button
            value="Me connecter"
            buttonClasses={ClassNames("login__button", "is-secondary", {
              "is-loading": loading
            })}
          />
        </form>
      )}
      {step === "login-form-success" && (
        <div>
          {showSuccessNotif && (
            <div className="login__notif login__notif--success has-mt-2 has-mb-2 swing-in-top-fwd">
              <FontAwesomeIcon icon={faCheck} />
              <p>
                Un message d'activation a été envoyé à {email}. Veuillez suivre
                les instructions qu'il contient.
              </p>
            </div>
          )}
          <div className="login__links">
            <Button
              value="Renvoyer le lien d'activation"
              icon="chevron-right"
              buttonClasses={[
                "login__button",
                "login__button--as-link",
                "has-text-link"
              ]}
              callback={() => {
                setShowSuccessNotif(false);
                login();
              }}
            />
            <Button
              value="Modifier l'adresse électronique"
              icon="chevron-right"
              buttonClasses={[
                "login__button",
                "login__button--as-link",
                "has-text-link"
              ]}
              callback={() => {
                setStep("login-form");
              }}
            />
            <a
              className="login__link has-text-link"
              href={`mailto:${Config.get("contact.mailto")}`}
            >
              <span className="button__icon">
                <FontAwesomeIcon icon="chevron-right" />
              </span>
              <span className="pl-2">Nous contacter</span>
            </a>
          </div>
        </div>
      )}
    </div>
  </div>
);

LoginForm.propTypes = {
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

export default LoginForm;
