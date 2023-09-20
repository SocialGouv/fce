import "./ListEstablishmentsResult.scss";

import React from "react";
import { useLocation } from "react-router";

import UsersFeedback from "../../../../containers/UsersFeedback";
import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import { Establishments } from "./Establishments.jsx";

const ListEstablishmentsResult = () => {
  const location = useLocation();
  useScrollToLocationHash({ location });
  return (
    <div className="sheet__main-container">
      <Establishments />
      <UsersFeedback fullWidth />
    </div>
  );
};

export default ListEstablishmentsResult;
