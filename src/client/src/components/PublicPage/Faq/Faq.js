import React from "react";
import PropTypes from "prop-types";
import UsersFeedback from "../../../containers/UsersFeedback";
import LoadSpinner from "../../shared/LoadSpinner";
import { Question } from "./Question";

import "./faq.scss";

const Faq = ({ pageData = null, isLoading, hasError }) => {
  if (hasError) {
    return (
      <div className="page content">
        Une erreur est survenue, impossible d{"'"}afficher le contenu de la page{" "}
        <strong>{window.location.pathname}</strong>
      </div>
    );
  }

  console.log(pageData);

  return (
    <>
      <div className="page content faq">
        {isLoading ? (
          <LoadSpinner />
        ) : (
          <>
            <h1>FAQ</h1>
            <p>
              <strong>
                Vous rencontrez une difficulté dans l'utilisation de FCE ? Nous
                mettons à votre disposition cette foire aux questions et des
                tutoriels vidéo afin de répondre à vos interrogations et de vous
                accompagner au mieux.
              </strong>
            </p>

            {pageData?.faq_sections?.map(section => {
              return (
                <section className="faq__section" key={section.Titre}>
                  <h2 className="faq__title">{section.Titre}</h2>
                  <dl>
                    {section.questions.map(question => {
                      return (
                        <Question
                          key={question.question}
                          question={question.question}
                          reponse={question.reponse}
                        />
                      );
                    })}
                  </dl>
                </section>
              );
            })}
          </>
        )}
      </div>
      <UsersFeedback fullWidth />
    </>
  );
};

Faq.propTypes = {
  pageData: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default Faq;
