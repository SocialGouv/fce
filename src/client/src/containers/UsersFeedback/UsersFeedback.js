import React, { useReducer } from "react";
import PropTypes from "prop-types";
import { captureException as sentryCaptureException } from "@sentry/browser";
import Http from "../../services/Http";
import UsersFeedbackView from "../../components/UsersFeedback";
import { SET_USEFUL, SET_COMMENT, SET_RATE, RESET } from "./actionTypes";

const initialState = { useful: "", comment: "", rate: null };

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

const UsersFeedback = ({ fullWidth }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendFeedback = e => {
    e.preventDefault();

    Http.post("/feedback", {
      params: {
        useful: state.useful === "thumbup",
        comment: state.comment,
        rate: state.rate
      }
    })
      .catch(e => {
        if (process.env.NODE_ENV === "production") {
          sentryCaptureException(e);
        } else {
          console.error(e);
        }
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
    />
  );
};

UsersFeedback.propTypes = {
  fullWidth: PropTypes.bool
};

export default UsersFeedback;
