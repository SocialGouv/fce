import React from "react";
import PropTypes from "prop-types";

import "./info.scss";

const Info = ({
  text = "Suite à un problème technique cette donnée est momentanément indisponible."
}) => <div className="info">{text}</div>;

Info.propTypes = {
  text: PropTypes.string
};

export default Info;
