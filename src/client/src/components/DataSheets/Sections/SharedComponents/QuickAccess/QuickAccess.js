import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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
              <Link to={`#${anchor.link}`}>{anchor.label}</Link>
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
