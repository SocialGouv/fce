import React from "react";
import PropTypes from "prop-types";
import Sticky from "react-sticky-el";
import Scrollspy from "react-scrollspy";

import "./quickAccess.scss";
import { Muteco } from "../../Establishment";

const QuickAccess = ({ anchors }) => {
  anchors = [
    { label: "activité", link: "activity" },
    { label: "visites et contrôles", link: "direccte" },
    { label: "relation travail", link: "relation" },
    { label: "mutations économiques", link: "muteco" },
    { label: "aides et agréments", link: "helps" }
  ];

  return (
    <Sticky>
      <section className="quick-access">
        <div className="tabs is-centered">
          <Scrollspy
            items={["activity", "direccte", "relation", "muteco", "helps"]}
            className="quick-access__list"
            currentClassName="is-active"
            offset={-80}
          >
            {anchors.map(anchor => (
              <li
                key={anchor.label}
                className="quick-access__item is-capitalized has-text-weight-semibold has-text-grey"
              >
                <a href={`#${anchor.link}`}>{anchor.label}</a>
              </li>
            ))}
          </Scrollspy>
        </div>
      </section>
    </Sticky>
  );
};

QuickAccess.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.number)
};

export default QuickAccess;
