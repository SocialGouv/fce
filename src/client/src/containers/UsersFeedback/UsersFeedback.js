import PropTypes from "prop-types";
import React, { useReducer } from "react";

import UsersFeedbackView from "../../components/UsersFeedback";
import { handleError } from "../../helpers/utils";
import Http from "../../services/Http";
import { RESET, SET_COMMENT, SET_RATE, SET_USEFUL } from "./actionTypes";

const initialState = { comment: "", rate: null, useful: true };

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USEFUL:
      return { ...state, useful: action.payload };
    case SET_COMMENT:
      return { ...state, comment: action.payload };
    case SET_RATE:
      return { ...state, rate: action.payload };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

const UsersFeedback = ({
  fullWidth,
  isOpenUserFeedback,
  onOpenUserFeedback,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendFeedback = (e) => {
    e.preventDefault();

    Http.post(
      "/feedback",
      {
        params: {
          comment: state.comment,
          rate: state.rate,
          useful: state.useful,
        },
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        dispatch({ type: RESET });
      });
  };

  return (
    <UsersFeedbackView
      state={state}
      dispatch={dispatch}
      sendFeedback={sendFeedback}
      fullWidth={fullWidth}
      isOpenUserFeedback={isOpenUserFeedback}
      onOpenUserFeedback={onOpenUserFeedback}
    />
  );
};

UsersFeedback.propTypes = {
  fullWidth: PropTypes.bool,
  isOpenUserFeedback: PropTypes.bool,
  onOpenUserFeedback: PropTypes.func,
};

export default UsersFeedback;
