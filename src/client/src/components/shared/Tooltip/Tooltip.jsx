import "./Tooltip.scss";

import PropTypes from "prop-types";
import React, { useState } from "react";

function Tooltip({ content, children, position }) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const showTooltip = () => {
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  return (
    <div className="tooltip-container">
      <div
        className="element-with-tooltip"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {isTooltipVisible && (
        <div className={`tooltip ${position}`}>
          <div className="content">{content}</div>
        </div>
      )}
    </div>
  );
}

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.string,
  position: PropTypes.string,
};
export default Tooltip;
