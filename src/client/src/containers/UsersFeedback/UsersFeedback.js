import React, { useState } from "react";
import { captureException as sentryCaptureException } from "@sentry/browser";
import Http from "../../services/Http";
import UsersFeedbackView from "../../components/UsersFeedback";

const UsersFeedback = () => {
  const [useful, setUseful] = useState("");
  const [comment, setComment] = useState("");

  const handleInput = e => {
    switch (e.target.name) {
      case "useful":
        setUseful(e.target.value);
        break;
      case "comment":
        setComment(e.target.value);
        break;
    }
  };

  const sendFeedback = e => {
    e.preventDefault();

    Http.post("/feedback", {
      params: {
        useful: useful === "thumbup",
        comment
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
        setUseful("");
        setComment("");
      });
  };

  return (
    <UsersFeedbackView
      useful={useful}
      comment={comment}
      handleInput={handleInput}
      sendFeedback={sendFeedback}
    />
  );
};

export default UsersFeedback;
