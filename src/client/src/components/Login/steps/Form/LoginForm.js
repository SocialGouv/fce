import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import StepForm from "./StepForm";
import HeadForm from "./HeadForm";
import Button from "../../../shared/Button";
import Config from "../../../../services/Config";
import SuccessMessage from "./SuccessMessage";

const LoginForm = ({
  login,
  sendCode,
  hasError,
  errorMessage = null,
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
            onChange={setEmail}
            buttonText="Recevoir le code"
            onSubmit={evt => sendCode(evt, email)}
            errorMessage={errorMessage}
            loading={loading}
            hasError={hasError}
          />
        )}
        {step === "login-form-code" && (
          <>
            {showSuccessNotif && (
              <SuccessMessage
                message={`Un code d'activation a été envoyé à ${email}. Veuillez l'entrer dans le champ ci-dessous.`}
              />
            )}
            <StepForm
              inputLabel="Code (reçu par e-mail)"
              inputValue={code || ""}
              onChange={setCode}
              buttonText="Me connecter"
              onSubmit={evt => login(evt, email, code)}
              errorMessage={errorMessage}
              loading={loading}
              hasError={hasError}
            />
            <div className="login__links">
              <Button
                value="Renvoyer le code"
                icon={faChevronRight}
                buttonClasses={[
                  "login__button",
                  "login__button--as-link",
                  "has-text-link"
                ]}
                callback={evt => {
                  setShowSuccessNotif(false);
                  sendCode(evt, email);
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
                  setStep("login-form-email");
                }}
              />
              <a
                className="login__link has-text-link"
                href={`mailto:${Config.get("contact.mailto")}`}
              >
                <span className="button-icon button-icon--after-label">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
                <span>Nous contacter</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  sendCode: PropTypes.func.isRequired,
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
