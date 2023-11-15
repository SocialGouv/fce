import "./faq.scss";

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import UsersFeedback from "../../../containers/UsersFeedback";
import ScrollToTopButton from "../../DataSheets/Sections/SharedComponents/ScrollToTopButton/ScrollToTopButton.jsx";
import LoadSpinner from "../../shared/LoadSpinner";
import { Question } from "./Question";

const Faq = ({ pageData = null, isLoading, hasError }) => {
  if (hasError) {
    return (
      <div className="page content">
        Une erreur est survenue, impossible d{"'"}afficher le contenu de la page{" "}
        <strong>{window.location.pathname}</strong>
      </div>
    );
  }

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
                Vous rencontrez une difficulté dans l&apos;utilisation de FCE ?
                Nous mettons à votre disposition cette foire aux questions et
                des <Link to="/aide">tutoriels vidéo</Link> afin de répondre à
                vos interrogations et de vous accompagner au mieux.
              </strong>
            </p>

            {pageData?.faq_sections?.map((section) => {
              return (
                <section className="faq__section" key={section.Titre}>
                  <h2 className="faq__title">{section.Titre}</h2>
                  <dl>
                    {section.questions.map((question) => {
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
      <ScrollToTopButton />
    </>
  );
};

Faq.propTypes = {
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageData: PropTypes.object,
};

export default Faq;
