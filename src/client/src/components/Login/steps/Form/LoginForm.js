import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import StepForm from "./StepForm";
import HeadForm from "./HeadForm";
import Button from "../../../shared/Button";
import Config from "../../../../services/Config";

const LoginForm = ({
  login,
  sendCode,
  hasError,
  errorMessage,
  loading,
  step,
  setStep,
  showSuccessNotif,
  setShowSuccessNotif
}) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="login__container login__container--form container">
      <div>
        <HeadForm step={step} />
        {step === "login-form-email" && (
          <StepForm
            inputLabel="Adresse électronique (e-mail)"
            inputValue={email || ""}
            onChangeCallback={setEmail}
            buttonText="Recevoir le code"
            submitCallback={evt => sendCode(evt, email)}
            errorMessage={errorMessage}
            loading={loading}
            hasError={hasError}
          />
        )}
        {step === "login-form-code" && (
          <StepForm
            inputLabel="Code (reçu par e-mail)"
            inputValue={code || ""}
            onChangeCallback={setCode}
            buttonText="Me connecter"
            submitCallback={evt => login(evt, email, code)}
            errorMessage={errorMessage}
            loading={loading}
            hasError={hasError}
          />
        )}
        {step === "login-form-success" && (
          <div>
            {showSuccessNotif && (
              <div className="login__notif login__notif--success has-mt-2 has-mb-2 swing-in-top-fwd">
                <FontAwesomeIcon icon={faCheck} />
                <p>
                  Un message d{"'"}activation a été envoyé à {email}. Veuillez
                  suivre les instructions qu{"'"}il contient.
                </p>
              </div>
            )}
            <div className="login__links">
              <Button
                value="Renvoyer le lien d'activation"
                icon={faChevronRight}
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
                icon={faChevronRight}
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
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span className="pl-2">Nous contacter</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired
};

export default LoginForm;
