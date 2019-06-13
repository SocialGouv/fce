import React, { useState } from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck } from "@fortawesome/fontawesome-pro-solid";
import Button from "../shared/Button";

import "./login.scss";

const Login = ({
  login,
  hasSuccess,
  hasError,
  errorMessage,
  updateForm,
  loading
}) => {
  const [step, setStep] = useState("home");

  console.log(step);
  return (
    <section className="section">
      {/* 1st step */}
      {step === "home" && (
        <div className="container has-text-centered">
          <h1 className="login__title is-size-4-touch is-size-3-desktop has-text-weight-bold has-mb-05">
            Retrouvez les informations légales et administratives des
            entreprises
          </h1>
          <div className="columns is-centered">
            <div className="column is-6-desktop has-mb-2">
              <p className="is-size-5-touch is-size-4-desktop">
                L'état civil, l'activité et les données de l'administration
                <br />
                dans une seule fiche destinée aux agents publics
              </p>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <p className="has-mb-1">
                Ce service est destiné aux agents de service public.
                <br />
                Pour y accéder veuillez vous identifier.
              </p>
              <Button
                value="Me connecter"
                buttonClasses="login__button is-secondary"
                callback={() => {
                  setStep("magiclink-form");
                }}
              />
            </div>
          </div>
        </div>
      )}
      {/* 2nd and 3rd step */}
      {step !== "home" && (
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-desktop is-flex flex-center">
              <div>
                <h1 className="login__title is-size-4-touch is-size-3-desktop has-text-weight-bold has-mb-1">
                  Me connecter
                </h1>
                <p className="has-mb-1">
                  Pour accéder à l'application FCE, merci de renseigner votre
                  adresse électronique (e-mail).
                </p>
                <p className="has-mb-1">
                  Vous recevrez un lien de connexion qui sera valide durant 30
                  jours. Passez ce délai vous devrez renouveler votre demande.
                </p>
                {step === "magiclink-form" && !hasSuccess && (
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
                          invalid={hasError}
                          onChange={evt => updateForm(evt)}
                        />
                      </div>
                    </div>
                    <Button
                      value={
                        loading ? (
                          <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                          "Me connecter"
                        )
                      }
                      buttonClasses="login__button is-secondary"
                    />
                  </form>
                )}
                {step === "magiclink-form" && hasSuccess && (
                  <di>
                    <div className="login__notif--success has-mt-2 flip-in-hor-bottom">
                      <FontAwesomeIcon icon={faCheck} />
                      <p>
                        Un message d'activation a été envoyé à
                        adresse@courriel.fr. Veuillez suivre les instructions
                        qu'il contient.
                      </p>
                    </div>
                    <button onClick={login}>
                      Renvoyer le lien d'activation
                    </button>
                  </di>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
