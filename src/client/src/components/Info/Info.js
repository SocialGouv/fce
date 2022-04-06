import "./info.scss";

import PropTypes from "prop-types";
import React from "react";

const Info = ({
  text = "Suite à un problème technique cette donnée est momentanément indisponible.",
}) => <div className="info">{text}</div>;

Info.propTypes = {
  text: PropTypes.string,
};

export default Info;
