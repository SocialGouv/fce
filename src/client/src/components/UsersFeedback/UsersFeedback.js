import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  faThumbsUp as faSolidThumbsUp,
  faThumbsDown as faSolidThumbsDown
} from "@fortawesome/pro-solid-svg-icons";
import {
  faThumbsUp as faLightThumbsUp,
  faThumbsDown as faLightThumbsDown
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "./Rating";
import {
  SET_USEFUL,
  SET_COMMENT,
  RESET
} from "../../containers/UsersFeedback/actionTypes";

import "./usersFeedback.scss";

const UsersFeedback = ({ state, dispatch, sendFeedback, fullWidth }) => {
  const handleChange = action => e => {
    dispatch({ type: action, payload: e.target.value });
  };

  return (
    <section
      className={classNames({
        "user-feedback": true,
        "user-feedback--fullwidth": fullWidth
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
                  checked={state.useful === "thumbup"}
                  onChange={handleChange(SET_USEFUL)}
                />
                <label htmlFor="thumb-up" className="radio" title="Oui">
                  {state.useful === "thumbup" ? (
                    <FontAwesomeIcon icon={faSolidThumbsUp} />
                  ) : (
                    <FontAwesomeIcon icon={faLightThumbsUp} />
                  )}
                </label>
                <input
                  id="thumb-down"
                  type="radio"
                  name="useful"
                  value="thumbdown"
                  checked={state.useful === "thumbdown"}
                  onChange={handleChange(SET_USEFUL)}
                />
                <label htmlFor="thumb-down" className="radio" title="Non">
                  {state.useful === "thumbdown" ? (
                    <FontAwesomeIcon icon={faSolidThumbsDown} />
                  ) : (
                    <FontAwesomeIcon icon={faLightThumbsDown} />
                  )}
                </label>
              </div>
            </div>
          </fieldset>

          {state.useful && (
            <div className="control user-feedback__comment">
              <label htmlFor="comment">
                <strong>
                  Souhaitez vous nous en dire davantage ? (facultatif)
                </strong>
              </label>
              <textarea
                id="comment"
                className="textarea"
                name="comment"
                value={state.comment}
                onChange={handleChange(SET_COMMENT)}
              />

              <Rating
                min={0}
                max={10}
                state={state}
                handleChange={handleChange}
              />

              <div className="user-feedback__buttons">
                <button type="submit" className="button is-primary">
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
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool
};

export default UsersFeedback;
