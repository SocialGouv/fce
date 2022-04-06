import "./usersFeedback.scss";

import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

import {
  SET_COMMENT,
  SET_USEFUL,
} from "../../containers/UsersFeedback/actionTypes";
import Rating from "./Rating";

const UsersFeedback = ({
  state: { useful, comment, rate },
  dispatch,
  sendFeedback,
  fullWidth,
}) => {
  const handleChange = (action) => (e) => {
    dispatch({ payload: e.target.value, type: action });
  };

  return (
    <section
      className={classNames({
        "user-feedback": true,
        "user-feedback--fullwidth": fullWidth,
      })}
    >
      <div className="container">
        <form className="user-feedback__panel" onSubmit={sendFeedback}>
          <fieldset>
            <div className="control user-feedback__useful">
              <legend>
                L{"'"}information trouvée vous a-t-elle été utile?
              </legend>
              <div id="user-feedback" className="user-feedback__thumbs">
                <input
                  id="thumb-up"
                  type="radio"
                  name="useful"
                  value="thumbup"
                  checked={useful === "thumbup"}
                  onChange={handleChange(SET_USEFUL)}
                />
                <label htmlFor="thumb-up" className="radio" title="Oui">
                  {useful === "thumbup" ? (
                    <FontAwesomeIcon icon={faThumbsUp} className="selected" />
                  ) : (
                    <FontAwesomeIcon icon={faThumbsUp} />
                  )}
                </label>
                <input
                  id="thumb-down"
                  type="radio"
                  name="useful"
                  value="thumbdown"
                  checked={useful === "thumbdown"}
                  onChange={handleChange(SET_USEFUL)}
                />
                <label htmlFor="thumb-down" className="radio" title="Non">
                  {useful === "thumbdown" ? (
                    <FontAwesomeIcon icon={faThumbsDown} className="selected" />
                  ) : (
                    <FontAwesomeIcon icon={faThumbsDown} />
                  )}
                </label>
              </div>
            </div>
          </fieldset>

          {useful && (
            <div className="control user-feedback__comment">
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
                  type="submit"
                  className="button is-primary"
                  disabled={!rate}
                >
                  Envoyer
                </button>
              </div>
            </div>
          )}
        </form>
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
