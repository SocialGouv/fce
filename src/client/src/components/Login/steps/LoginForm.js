import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ClassNames from "classnames";
import Button from "../../shared/Button";

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
    <div className="login__magiclink">
      <h1 className="login__title is-size-4-touch is-size-3-desktop has-text-weight-bold has-mb-2">
        Me connecter
      </h1>
      <p className="has-mb-1">
        Pour accéder à l'application FCE, merci de renseigner votre adresse
        électronique (e-mail).
      </p>
      <p className="has-mb-1">
        Vous recevrez un lien de connexion qui sera valide durant 30 jours.
        Passez ce délai vous devrez renouveler votre demande.
      </p>
      {step === "login-form" && (
        <form className="login-form has-mt-2" onSubmit={login}>
          {hasError && (
            <div className="notification is-danger shake-horizontal">
              {errorMessage}
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
                value={email ? email : null}
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
            <div className="login__notif--success has-mt-2 has-mb-2 swing-in-top-fwd">
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
              buttonClasses="login__button--as-link has-text-link"
              callback={() => {
                setShowSuccessNotif(false);
                login();
              }}
            />
            <Button
              value="Modifier l'adresse électronique"
              icon="chevron-right"
              buttonClasses="login__button--as-link has-text-link"
              callback={() => {
                setStep("login-form");
              }}
            />
            <a
              className="login__link has-text-link"
              href="mailto:chloe.mandelblat@direccte.gouv.fr"
            >
              <span className="icon">
                <FontAwesomeIcon icon="chevron-right" />
              </span>
              <span>Nous contacter</span>
            </a>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default LoginForm;
