import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export const Question = ({ question, reponse }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <dt>
        <button
          className="faq__question"
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <span className={classNames("faq__question-text", { open: isOpen })}>
            {question}
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="faq__reponse">
          <ReactMarkdown>{reponse}</ReactMarkdown>
        </dd>
      )}
    </>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  reponse: PropTypes.string.isRequired,
};
