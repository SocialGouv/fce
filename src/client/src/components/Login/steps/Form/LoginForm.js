import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
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
  errorMessage,
  loading,
  step,
  setStep,
  showSuccessNotif,
  setShowSuccessNotif
}) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
  const isDisabledEmailSubmit = !emailRegex.test(email);
  const isDisabledCodeSubmit = code.length < 5;

  const handleCodeChange = value => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    setCode(cleanedValue.slice(0, Config.get("auth.codeLength")));
  };

  return (
    <div className="login__container login__container--form container">
      <div>
        <HeadForm step={step} />
        {step === "login-form-email" && (
          <StepForm
            onSubmit={evt => sendCode(evt, email)}
            errorMessage={errorMessage}
            loading={loading}
          >
            <div>
              <label htmlFor="email" className="label">
                Adresse électronique (e-mail)
              </label>
              <div className="field has-addons">
                <div className="control is-expanded">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="input"
                    pattern={`${emailRegex}`}
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="control">
                  <Button
                    type="submit"
                    value="Recevoir le code"
                    buttonClasses={classNames("login__button", {
                      "is-loading": loading,
                      "is-secondary": !isDisabledEmailSubmit
                    })}
                    isDisabled={isDisabledEmailSubmit}
                  />
                </div>
              </div>
            </div>
          </StepForm>
        )}
        {step === "login-form-code" && (
          <>
            {showSuccessNotif && (
              <SuccessMessage
                message={`Un code d'activation a été envoyé à ${email}. Veuillez l'entrer dans le champ ci-dessous.`}
              />
            )}
            <StepForm
              onSubmit={e => login(e, email, code)}
              errorMessage={errorMessage}
              loading={loading}
            >
              <div>
                <label htmlFor="code" className="label">
                  Code à 5 chiffres (reçu par e-mail)
                </label>
                <div className="field  has-addons">
                  <div className="control is-expanded">
                    <input
                      id="code"
                      type="text"
                      name="code"
                      className="input login__code-input"
                      required
                      value={code}
                      onChange={e => handleCodeChange(e.target.value)}
                    />
                  </div>
                  <div className="control">
                    <Button
                      value="Me connecter"
                      isDisabled={isDisabledCodeSubmit}
                      buttonClasses={classNames(
                        "login__button",

                        {
                          "is-loading": loading,
                          "is-secondary": !isDisabledCodeSubmit
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            </StepForm>
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
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
  setStep: PropTypes.func.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired
};

export default LoginForm;
