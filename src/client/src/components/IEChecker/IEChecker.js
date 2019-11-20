import React from "react";
import PropTypes from "prop-types";
import { isIE } from "../../helpers/BrowserDetection";
import ErrorIE from "../../components/Errors/ErrorIE";

const IEChecker = ({ children }) => {
  return isIE() ? <ErrorIE /> : children;
};

IEChecker.propTypes = {
  children: PropTypes.node
};

export default IEChecker;
