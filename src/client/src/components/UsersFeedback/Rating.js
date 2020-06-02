import React from "react";
import PropTypes from "prop-types";
import { range } from "../../helpers/utils/utils";
import { SET_RATE } from "../../containers/UsersFeedback/actionTypes";

const Rating = ({ min, max, state, handleChange }) => {
  return (
    <div className="user-feedback__rating">
      {range(min, max).map(number => (
        <label
          className="user-feedback__rate"
          key={`rating${number}`}
          tabIndex="0"
        >
          <input
            className="user-feedback__rate-radio"
            type="radio"
            name="rate"
            value={`${number}`}
            checked={state.rate === `${number}`}
            onChange={handleChange(SET_RATE)}
          />
          <span className="user-feedback__rate-span">
            <strong>{number}</strong>
          </span>
        </label>
      ))}
    </div>
  );
};

Rating.propTypes = {};

export default Rating;
