import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { useStrapiData } from "../../../../helpers/hooks/useStrapiData";
import Config from "../../../../services/Config";
import Button from "../../../shared/Button";
import ErrorMessage from "./ErrorMessage";
import HeadForm from "./HeadForm";
import InfoMessage from "./InfoMessage";
import StepForm from "./StepForm";
import SuccessMessage from "./SuccessMessage";

const LoginForm = ({
  login,
  sendCode,
  errorMessage,
  infoMessage,
  loading,
  step,
  setStep,
  showSuccessNotif,
  setShowSuccessNotif,
  showMailingListSignup,
}) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCheckedSubscription, setIsCheckedSubscription] = useState(false);

  const isDisabledEmailSubmit = email === "";
  const isDisabledCodeSubmit = code.length < 5;

  const handleCodeChange = (value) => {
    const cleanedValue = value.replace(/[^\d]/g, "");
    setCode(cleanedValue.slice(0, Config.get("auth.codeLength")));
  };

  const { pageData: errorData } = useStrapiData("/messages-d-erreur");

  return (
    <div className="login__container login__container--form container">
      <div>
        <HeadForm step={step} />
        {step === "login-form-email" && (
          <StepForm
            onSubmit={(evt) => sendCode(evt, email)}
            errorMessage={errorMessage}
            loading={loading}
          >
            <div className="login__message">
              <InfoMessage>
                <h5>Connexion pour les agents des DDETS (PP)</h5>
                Vous pouvez désormais vous connecter en utilisant votre adresse
                mail au format : <strong>prenom.nom@departement.gouv.fr</strong>
              </InfoMessage>
              {errorData?.loginMessage && (
                <ErrorMessage>{errorData.loginMessage}</ErrorMessage>
              )}
            </div>
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
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                  />
                </div>
                <div className="control">
                  <Button
                    type="submit"
                    value="Recevoir le code"
                    buttonClasses={classNames("login__button", {
                      "is-loading": loading,
                      "is-tertiary": !isDisabledEmailSubmit,
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
            {infoMessage && <InfoMessage>{infoMessage}</InfoMessage>}
            <StepForm
              onSubmit={(e) => login(e, email, code, isCheckedSubscription)}
              errorMessage={errorMessage}
            >
              <div>
                {showMailingListSignup && (
                  <div className="login__mailing-list">
                    <input
                      id="mailing-list"
                      name="mailing-list"
                      type="checkbox"
                      checked={isCheckedSubscription}
                      onChange={() =>
                        setIsCheckedSubscription(!isCheckedSubscription)
                      }
                    />
                    <label htmlFor="mailing-list">
                      <strong>
                        Je souhaite recevoir des informations par email.
                      </strong>
                    </label>
                    {isCheckedSubscription && (
                      <div>
                        Dès votre connexion votre adresse email sera ajoutée à
                        notre liste de contacts. Un email de confirmation vous
                        sera envoyé.
                      </div>
                    )}
                  </div>
                )}
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
                      onChange={(e) => handleCodeChange(e.target.value)}
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
                          "is-secondary": !isDisabledCodeSubmit,
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
                  "has-text-link",
                ]}
                callback={(evt) => {
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
                  "has-text-link",
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
  errorMessage: PropTypes.string,
  infoMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  sendCode: PropTypes.func.isRequired,
  setShowSuccessNotif: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  showMailingListSignup: PropTypes.bool.isRequired,
  showSuccessNotif: PropTypes.bool.isRequired,
  step: PropTypes.string.isRequired,
};

export default LoginForm;
