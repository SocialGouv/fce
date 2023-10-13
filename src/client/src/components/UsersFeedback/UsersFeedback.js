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
}) => {
  const handleChange = (action) => (e) => {
    dispatch({ payload: e.target.value, type: action });
  };
  const [thumbup, setThumbup] = useState(false);
  const [thumbdown, setThumbdown] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <section
      id="user-feedback"
      className={classNames({
        "user-feedback": true,
        "user-feedback--fullwidth": fullWidth,
      })}
    >
      <div className="container is-fullhd">
        <div className="user-feedback__panel">
          <fieldset>
            <div
              className="control user-feedback__useful"
              onClick={() => setIsOpenModal(!isOpenModal)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsOpenModal(!isOpenModal);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={isOpenModal}
            >
              <legend>Donnez-nous votre avis !</legend>
              <button
                className="icon selected"
                onClick={() => setIsOpenModal(!isOpenModal)}
              >
                {isOpenModal ? (
                  <ArrowUp color="white" />
                ) : (
                  <ArrowDown color="white" />
                )}
              </button>
            </div>
          </fieldset>

          {isOpenModal && (
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
              {/* <div
                id="user-feedback"
                className="user-feedback__thumbs yes-no-btns"
              >
                <input
                  id="thumb-up"
                  type="radio"
                  name="useful"
                  value="thumbup"
                  className={`yes-no-btn ${
                    useful === "thumbup" ? "active" : ""
                  }`}
                  checked={useful === "thumbup"}
                  onChange={handleChange(SET_USEFUL)}
                />
                <label htmlFor="thumb-up" className="radio" title="Oui">
                  Oui
                </label>
                <input
                  id="thumb-down"
                  type="radio"
                  name="useful"
                  value="thumbdown"
                  className={`yes-no-btn ${
                    useful === "thumbdown" ? "active" : ""
                  }`}
                  checked={useful === "thumbdown"}
                  onChange={handleChange(SET_USEFUL)}
                />
                <label htmlFor="thumb-down" className="radio" title="Non">
                  Non
                </label>
              </div> */}
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
  sendFeedback: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default UsersFeedback;
