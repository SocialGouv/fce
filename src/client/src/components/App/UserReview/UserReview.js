import React, { useState } from "react";
import {
  faThumbsUp as fasThumbsUp,
  faThumbsDown as fasThumbsDown
} from "@fortawesome/pro-solid-svg-icons";
import {
  faThumbsUp as falThumbsUp,
  faThumbsDown as falThumbsDown
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./userReview.scss";

const UserReview = () => {
  const [like, setLike] = useState("");
  const [comment, setComment] = useState("");

  const handleInput = e => {
    switch (e.target.name) {
      case "like":
        setLike(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  return (
    console.log(like, comment),
    (
      <section className="user-review">
        <div className="container">
          <form className="user-review__panel">
            <fieldset>
              <div className="control user-review__like">
                <legend>
                  L’information sur cette page vous a-t-elle été utile?
                </legend>
                <div className="user-review__thumbs">
                  <input
                    id="thumb-up"
                    type="radio"
                    name="like"
                    value="thumbup"
                    checked={like === "thumbup"}
                    onChange={handleInput}
                  />
                  <label htmlFor="thumb-up" className="radio" title="Oui">
                    {like === "thumbup" ? (
                      <FontAwesomeIcon icon={fasThumbsUp} />
                    ) : (
                      <FontAwesomeIcon icon={falThumbsUp} />
                    )}
                  </label>
                  <input
                    id="thumb-down"
                    type="radio"
                    name="like"
                    value="thumbdown"
                    checked={like === "thumbdown"}
                    onChange={handleInput}
                  />
                  <label htmlFor="thumb-down" className="radio" title="Non">
                    {like === "thumbdown" ? (
                      <FontAwesomeIcon icon={fasThumbsDown} />
                    ) : (
                      <FontAwesomeIcon icon={falThumbsDown} />
                    )}
                  </label>
                </div>
              </div>
            </fieldset>

            {like !== "" && (
              <div className="control user-review__comment">
                <label>
                  <strong>Souhaitez vous nous en dire davantage ?</strong>
                </label>
                <textarea
                  className="textarea"
                  name="comment"
                  value={comment}
                  onChange={handleInput}
                />

                <button className="button is-primary">Envoyer</button>
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setLike("");
                    setComment("");
                  }}
                >
                  Annuler
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    )
  );
};

export default UserReview;
