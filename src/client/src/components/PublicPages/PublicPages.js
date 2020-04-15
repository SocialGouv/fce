import React from "react";
import UsersFeedback from "../../containers/UsersFeedback";

const PublicPage = ({ children }) => {
  return (
    <>
      <div className="page">{children}</div>
      <UsersFeedback fullWidth />
    </>
  );
};

export default PublicPage;
