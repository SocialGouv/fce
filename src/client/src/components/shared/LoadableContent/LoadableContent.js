import React from "react";
import { propTypes } from "react-widgets/lib/util/Filter";

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
  children: propTypes.node,
  error: propTypes.any,
  loading: propTypes.bool,
};

export default LoadableContent;
