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
  state: { comment, rate },
  dispatch,
  sendFeedback,
  fullWidth,
  isOpenUserFeedback,
  onOpenUserfeedback,
}) => {
  const handleChange = (action) => (e) => {
    dispatch({ payload: e.target.value, type: action });
  };
  const [thumbup, setThumbup] = useState(false);
  const [thumbdown, setThumbdown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    onOpenUserfeedback();
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
              onClick={() => {
                setIsOpenModal(!isOpenModal);
                handleOpenModal;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  {
                    setIsOpenModal(!isOpenModal);
                    handleOpenModal;
                  }
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isOpenModal}
            >
              <legend>Donnez-nous votre avis !</legend>
              <button
                className="icon selected"
                onClick={() => {
                  setIsOpenModal(!isOpenModal);
                  handleOpenModal;
                }}
              >
                {isOpenModal ? (
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
                  value="thumbup"
                  onClick={() => {
                    setThumbdown(false);
                    setThumbup(true);
                    handleChange(SET_USEFUL);
                  }}
                >
                  Oui
                </button>

                <button
                  className={`yes-no-btn ${thumbdown ? "active" : ""}`}
                  value="thumbdown"
                  onClick={() => {
                    setThumbup(false);
                    setThumbdown(true);

                    handleChange(SET_USEFUL);
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
  onOpenUserfeedback: PropTypes.func,
  sendFeedback: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default UsersFeedback;
