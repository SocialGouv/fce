import PropTypes from "prop-types";
import React from "react";

import ErrorIE from "../../components/Errors/ErrorIE";
import { isIE } from "../../helpers/BrowserDetection";

const IEChecker = ({ children }) => {
  return isIE() ? <ErrorIE /> : children;
};

IEChecker.propTypes = {
  children: PropTypes.node,
};

export default IEChecker;
