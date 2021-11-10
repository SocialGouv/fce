import React from 'react';
import 'rc-tooltip/assets/bootstrap_white.css';
import RcTooltip from 'rc-tooltip';

const Tooltip = ({ children, overlay }) => (
    <RcTooltip
        overlayClassName="fce-tooltip"
        overlay={overlay}
        trigger={["focus", "hover"]}
        placement="bottom"
    >
        <span tabIndex="0" className="fce-tooltip-container">
            {children}
        </span>
    </RcTooltip>
);

export default Tooltip;
