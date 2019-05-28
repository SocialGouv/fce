import React from "react";

const QuickAccess = () => {
  const anchors = [
    { label: "activité | ", link: "activity" },
    { label: "visites et contrôles | ", link: "direccte" },
    { label: "relation travail | ", link: "relation" },
    { label: "mutations économiques | ", link: "muteco" },
    { label: "aides et agréments", link: "helps" }
  ];

  return (
    <section id="quick-access" className="enterprise-section quick-access">
      <span className="has-text-grey-darker has-text-weight-medium">
        Accès rapide :{" "}
      </span>
      {anchors.map(anchor => (
        <a
          key={anchor.label}
          href={`#${anchor.link}`}
          className="quick-access--item has-text-link is-uppercase"
        >
          {anchor.label}
        </a>
      ))}
    </section>
  );
};

export default QuickAccess;
