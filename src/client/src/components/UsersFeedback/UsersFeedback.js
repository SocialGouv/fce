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

import "./usersFeedback.scss";

const UsersFeedback = ({
  useful,
  comment,
  handleInput,
  sendFeedback,
  fullWidth
}) => {
  return (
    <section
      className={classNames({
        "user-review": true,
        "user-review--fullwidth": fullWidth
      })}
    >
      <div className="container">
        <form className="user-review__panel" onSubmit={sendFeedback}>
          <fieldset>
            <div className="control user-review__useful">
              <legend>
                L{"'"}information trouvée vous a-t-elle été utile?
              </legend>
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

          {useful && (
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
  useful: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  sendFeedback: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool
};

export default UsersFeedback;
