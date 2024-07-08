import "./ListEstablishmentsResult.scss";

import React from "react";

// import { useLocation } from "react-router";
// import { useScrollToLocationHash } from "../../../../helpers/hooks/useScrollToLocationHash";
import { Establishments } from "./Establishments.jsx";

const ListEstablishmentsResult = () => {
  // const location = useLocation();
  // useScrollToLocationHash({ location });
  return (
    <div className="sheet__main-container">
      <Establishments />
    </div>
  );
};

export default ListEstablishmentsResult;
