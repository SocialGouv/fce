import PropTypes from "prop-types";
import React from "react";

import { SET_RATE } from "../../containers/UsersFeedback/actionTypes";
import { range } from "../../helpers/utils/utils";

const Rating = ({ min, max, rate = null, handleChange }) => {
  return (
    <div className="user-feedback__rating">
      <span className="question">
        Recommanderiez-vous ce site à un(e) collègue ?
      </span>
      <div className="user-feedback__rates">
        {range(min, max).map((number) => (
          <label className="user-feedback__rate" key={`rating${number}`}>
            <input
              className={`user-feedback__rate-radio `}
              type="radio"
              name="rate"
              value={`${number}`}
              checked={parseInt(rate) === number}
              onChange={handleChange(SET_RATE)}
            />
            <span
              className={` user-feedback__rate-span yes-no-btn ${
                parseInt(rate) === number ? "active" : ""
              } `}
            >
              {number}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

Rating.propTypes = {
  handleChange: PropTypes.func.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  rate: PropTypes.string,
};

export default Rating;
