import { PropTypes } from "prop-types";
import React from "react";

import LoadSpinner from "../LoadSpinner";
import Value from "../Value";

const LoadableContent = ({ loading, error, children }) => {
  if (loading) {
    return <LoadSpinner />;
  }

  if (error) {
    return <Value value={error.toString()} />;
  }

  return children || null;
};

LoadableContent.propTypes = {
  children: PropTypes.node,
  error: PropTypes.any,
  loading: PropTypes.bool,
};

export default LoadableContent;
