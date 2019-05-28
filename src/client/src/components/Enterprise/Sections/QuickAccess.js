import React from "react";

const QuickAccess = () => {
  const anchors = [
    { label: "activité", link: "activity" },
    { label: "visites et contrôles", link: "direccte" },
    { label: "relation travail", link: "relation" },
    { label: "mutations économiques", link: "muteco" },
    { label: "aides et agréments", link: "helps" }
  ];

  return (
    <section id="quick-access" className="enterprise-section quick-access">
      <span className="has-text-grey-darker has-text-weight-medium">
        Accès rapide :{" "}
      </span>
      <ul className="quick-access-list">
        {anchors.map(anchor => (
          <li className="quick-access--item has-text-link is-uppercase">
            <a key={anchor.label} href={`#${anchor.link}`}>
              {anchor.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QuickAccess;
