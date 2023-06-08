import React, { useEffect, useState } from "react";

import Auth from "../../services/Auth";
import RequestAccessForm from "./RequestAccessForm";

const isLogged = Auth.isLogged();

const formText =
  "Vous pouvez demander un accès à FCE en utilisant ce formulaire.";

const successText =
  " Votre demande a bien été effectuée. Vous recevrez un email de confirmation lorsqu'elle aura été validée.";

const RequestAccess = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (isLogged) history.push("/");
  }, [isLogged]);
  return (
    <section className="login">
      <div className="login__container login__container--form container">
        <section className="login__head-form">
          <h1 className="login__title">Demande d&apos;accès</h1>
          <p>{isSuccess ? successText : formText}</p>
        </section>
        {!isSuccess && (
          <RequestAccessForm onSuccess={() => setIsSuccess(true)} />
        )}
      </div>
    </section>
  );
};

export default RequestAccess;
