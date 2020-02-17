import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import {
  faThumbsUp as faSolidThumbsUp,
  faThumbsDown as faSolidThumbsDown
} from "@fortawesome/pro-solid-svg-icons";
import {
  faThumbsUp as faLightThumbsUp,
  faThumbsDown as faLightThumbsDown
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./usersFeedback.scss";

const UsersFeedback = ({
  useful,
  setUseful,
  comment,
  handleInput,
  sendFeedback
}) => {
  return (
    <section className="user-review">
      <div className="container">
        <form className="user-review__panel" onSubmit={sendFeedback}>
          <fieldset>
            <div className="control user-review__useful">
              <legend>Cette application vous a-t-elle été utile?</legend>
              <div id="user-review" className="user-review__thumbs">
                <input
                  id="thumb-up"
                  type="radio"
                  name="useful"
                  value="thumbup"
                  checked={useful === "thumbup"}
                  onChange={handleInput}
                />
                <label htmlFor="thumb-up" className="radio" title="Oui">
                  {useful === "thumbup" ? (
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
                  checked={useful === "thumbdown"}
                  onChange={handleInput}
                />
                <label htmlFor="thumb-down" className="radio" title="Non">
                  {useful === "thumbdown" ? (
                    <FontAwesomeIcon icon={faSolidThumbsDown} />
                  ) : (
                    <FontAwesomeIcon icon={faLightThumbsDown} />
                  )}
                </label>
              </div>
            </div>
          </fieldset>

          {useful !== "" && (
            <div className="control user-review__comment">
              <label>
                <strong>
                  Souhaitez vous nous en dire davantage ? (facultatif)
                </strong>
              </label>
              <textarea
                className="textarea"
                name="comment"
                value={comment}
                onChange={handleInput}
              />

              <div className="user-review__buttons">
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setUseful("");
                  }}
                >
                  Annuler
                </button>

                <button className="button is-primary">Envoyer</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

UsersFeedback.propTypes = {
  useful: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  setUseful: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  sendFeedback: PropTypes.func.isRequired
};

export default UsersFeedback;
