import React from "react";
import PropTypes from "prop-types";
import Sticky from "react-sticky-el";
import Scrollspy from "react-scrollspy";

import "./quickAccess.scss";

const QuickAccess = ({ anchors }) => {
  const links = anchors.map(anchor => anchor.link);

  return (
    <section className="quick-access">
      <div className="tabs is-fullwidth">
        <Scrollspy
          items={links}
          className="quick-access__list"
          currentClassName="is-active"
          offset={-80}
        >
          {anchors.map(anchor => (
            <li
              key={anchor.label}
              className="quick-access__item has-text-weight-semibold has-text-grey"
            >
              <a href={`#${anchor.link}`}>{anchor.label}</a>
            </li>
          ))}
        </Scrollspy>
      </div>
    </section>
  );
};

QuickAccess.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default QuickAccess;
