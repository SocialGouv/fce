import React, { useState } from "react";
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
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <UsersFeedbackView
      useful={useful}
      setUseful={setUseful}
      comment={comment}
      handleInput={handleInput}
      sendFeedback={sendFeedback}
    />
  );
};

export default UsersFeedback;
