import PropTypes from "prop-types";
import React from "react";

function HeaderLogo({ logo, width, height, className, title }) {
  return (
    <div
      className="logo-wrapper"
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    >
      <img className={className} src={logo} alt={title} title={title} />
    </div>
  );
}

HeaderLogo.propTypes = {
  className: PropTypes.String,
  height: PropTypes.number,
  logo: PropTypes.element,
  title: PropTypes.String,
  width: PropTypes.number,
};

export default HeaderLogo;
