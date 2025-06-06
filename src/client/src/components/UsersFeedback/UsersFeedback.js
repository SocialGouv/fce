import "./usersFeedback.scss";

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";

import {
  SET_COMMENT,
  SET_USEFUL,
} from "../../containers/UsersFeedback/actionTypes";
import ArrowDown from "../shared/Icons/ArrowDown.jsx";
import ArrowUp from "../shared/Icons/ArrowUp.jsx";
import Rating from "./Rating";

const UsersFeedback = ({
  state: { comment, rate, useful },
  dispatch,
  sendFeedback,
  fullWidth,
  isOpenUserFeedback,
  onOpenUserFeedback,
}) => {
  const handleChange = (action) => (e) => {
    dispatch({ payload: e.target.value, type: action });
  };
  const handleChangeThumb = (action, value) => {
    dispatch({ payload: value, type: action });
  };
  const [thumbup, setThumbup] = useState(useful);
  const [thumbdown, setThumbdown] = useState(!useful);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(isOpenUserFeedback ? false : !isOpenModal);
    onOpenUserFeedback(isOpenUserFeedback ? false : !isOpenModal);
  };
  return (
    <section
      id="user-feedback"
      className={classNames({
        "user-feedback": true,
        "user-feedback--fullwidth": fullWidth,
      })}
    >
      <div className="container is-fluid">
        <div className="user-feedback__panel">
          <fieldset>
            <div
              className="control user-feedback__useful"
              onClick={() => handleOpenModal()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOpenModal();
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isOpenModal}
            >
              <span className="legend-text">Donnez-nous votre avis !</span>
              <button
                className="icon selected"
                onClick={() => handleOpenModal()}
              >
                {isOpenModal || isOpenUserFeedback ? (
                  <ArrowUp color="white" />
                ) : (
                  <ArrowDown color="white" />
                )}
              </button>
            </div>
          </fieldset>

          {(isOpenModal || isOpenUserFeedback) && (
            <div className="control user-feedback__comment">
              <span className="question">{`L'information trouvée vous a-t-elle été utile?`}</span>
              <div className="yes-no-btns">
                <button
                  className={`yes-no-btn ${thumbup ? "active" : ""}`}
                  id="thumb-up"
                  value={thumbup}
                  onClick={() => {
                    setThumbdown(false);
                    setThumbup(true);
                    handleChangeThumb(SET_USEFUL, true);
                  }}
                >
                  Oui
                </button>

                <button
                  className={`yes-no-btn ${thumbdown ? "active" : ""}`}
                  value={thumbdown ? false : true}
                  onClick={() => {
                    setThumbup(false);
                    setThumbdown(true);

                    handleChangeThumb(SET_USEFUL, false);
                  }}
                >
                  Non
                </button>
              </div>

              <label htmlFor="comment">
                Souhaitez vous nous en dire davantage ? (facultatif)
              </label>
              <textarea
                id="comment"
                className="textarea"
                name="comment"
                value={comment}
                onChange={handleChange(SET_COMMENT)}
              />

              <Rating
                min={0}
                max={10}
                rate={rate}
                handleChange={handleChange}
              />
              <div className="user-feedback__buttons">
                <button
                  onClick={sendFeedback}
                  className="button"
                  disabled={!rate}
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

UsersFeedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  isOpenUserFeedback: PropTypes.bool,
  onOpenUserFeedback: PropTypes.func,
  sendFeedback: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default UsersFeedback;
