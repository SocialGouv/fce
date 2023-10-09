import PropTypes from "prop-types";
import React from "react";

function Logo({ logo, width, height, className, title }) {
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

Logo.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  logo: PropTypes.node,
  title: PropTypes.string,
  width: PropTypes.number,
};

export default Logo;
