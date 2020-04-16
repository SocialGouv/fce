import React from "react";
import PropTypes from "prop-types";
import UsersFeedback from "../../containers/UsersFeedback";

const PublicPage = ({ children }) => {
  return (
    <>
      <div className="page">{children}</div>
      <UsersFeedback fullWidth />
    </>
  );
};

PublicPage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default PublicPage;
