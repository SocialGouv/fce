import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { NounExcelIcon, NounPeopleIcon, NounPlatformIcon } from "./Icons";

const LoginLink = () => (
  <div
    className="home-page__link"
    title="Les agents des DDETS(PP), merci d'utiliser votre adresse au format @direccte.gouv.fr"
  >
    <Link to="/login">Je me connecte</Link>
  </div>
);

const RequestAccessLink = () => (
  <div className="home-page__link">
    <Link to="/request-access">Je demande un accès (agent DDETS)</Link>
  </div>
);

export const IconItems = ({ users, isLoading = false }) => {
  // I can't use anonymous function without a display name for icon.
  // That's make a lint error
  const items = [
    {
      firstParagraph: "20 millions d’entreprises",
      icon: function renderIcon(height) {
        return <NounExcelIcon height={height} />;
      },
      secondParagraph: "28 millions d’établissements",
    },
    {
      firstParagraph: "+ 5 millions de données collectées",
      icon: function renderIcon(height) {
        return <NounPlatformIcon height={height} />;
      },
      secondParagraph: "sur les effectifs, contrôles et aides",
    },
    {
      firstParagraph: `+ ${users} utilisateurs`,
      icon: function renderIcon(height) {
        return <NounPeopleIcon height={height} />;
      },
      secondParagraph: "dans les Dreets et Ddets(PP)",
    },
  ];

  return (
    <div className="home-page__section is-justify-content-center has-text-centered">
      <h2 className="home-page__blue-title">FCE en chiffres</h2>
      <div className="columns icons">
        {items.map((item, index) => {
          return (
            <React.Fragment key={item.firstParagraph}>
              <div className="column is-4 is-hidden-touch icons__item">
                <div className="icons__image-container">{item.icon(110)}</div>
                {isLoading && index === 2 ? (
                  <div className="dots">
                    <div />
                    <div />
                    <div />
                  </div>
                ) : (
                  <p>{item.firstParagraph}</p>
                )}
                <p>{item.secondParagraph}</p>
              </div>
              <div className="column icons__item is-hidden-desktop">
                <div className="icons__image-container">{item.icon(70)}</div>
                <p>
                  {item.firstParagraph} {item.secondParagraph}
                </p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

IconItems.propTypes = {
  isLoading: PropTypes.bool,
  users: PropTypes.number,
};

export const Summary = () => (
  <div className="home-page__summary home-page__section">
    <h3>
      Retrouvez les informations légales et administratives des entreprises
    </h3>
    <p>
      {`L'état civil, l'activité et les données de l'administration dans une seule
      fiche destinée aux agents publics`}
    </p>
    <div className="home-page__action-links-container">
      <LoginLink />
      <RequestAccessLink />
    </div>
  </div>
);

export const HowItWork = () => {
  const items = [
    {
      index: "1",
      paragraph:
        "J'identifie des entreprises et établissements selon plusieurs critères : nom, raison sociale, SIRET, localisation, activité et effectif",
      title: "PRATIQUE",
    },
    {
      index: "2",
      paragraph:
        "Je consulte les informations enregistrées parles autres services : légales, juridiques, effectifs et données métiers",
      title: "COLLABORATIF",
    },
    {
      index: "3",
      paragraph:
        "Je prends des décisions éclairées en ayant une vision à 360° sur l'entreprise et ses établissements",
      title: "DÉCISIF",
    },
  ];

  const renderItems = (isTouch = false) =>
    items.map((item) => (
      <React.Fragment key={item.title}>
        {isTouch ? (
          <div className="home-page__how-it-work__item">
            <div className="has-text-centered">
              <span>{item.index}</span>
            </div>
            <div className="mt-6">
              <h4>{item.title}</h4>
              <p>{item.paragraph}</p>
            </div>
          </div>
        ) : (
          <div className="home-page__how-it-work__item columns">
            <div className="column is-3 has-text-centered">
              <span>{item.index}</span>
            </div>
            <div className="column is-9 mt-6">
              <h4>{item.title}</h4>
              <p>{item.paragraph}</p>
            </div>
          </div>
        )}
      </React.Fragment>
    ));

  return (
    <div
      className="home-page__how-it-work is-justify-content-center particles"
      style={{ position: "relative" }}
    >
      <div style={{ position: "relative", zIndex: 2 }}>
        <h2 className="home-page__white-title">Comment ça marche ?</h2>
        <div className="columns is-justify-content-center is-hidden-touch">
          {renderItems()}
        </div>
        <div className="is-justify-content-center is-hidden-desktop">
          {renderItems(true)}
        </div>
      </div>
    </div>
  );
};

export const DailyUse = () => {
  const items = [
    {
      paragraph:
        "Identifier les services qui disposent d’informations sur une entreprise afin d’orienter utilement les demandes.",
      title: "FACILITER LES ÉCHANGES ENTRE LES SERVICES",
    },
    {
      paragraph:
        "Bénéficier d'une vision complète des relations entre les services des Dreets et Ddets(PP) et les entreprises pour agir en connaissance de cause.",
      title: "AJUSTER LES ACTIONS AUPRÈS DES ENTREPRISES",
    },
    {
      paragraph:
        "Restituer à un décideur (Préfet, Ministre....), en un minimum de temps, une fiche synthétique sur les (inter)actions menées par les services auprès d’une entreprise.",
      title: "RESTITUER L’INFORMATION AUX DÉCIDEURS",
    },
  ];

  return (
    <div className="home-page__daily-use home-page__section is-justify-content-center">
      <h2 className="home-page__blue-title">Quels usages au quotidien ?</h2>
      <div className="home-page__daily-use__items">
        {items.map((item) => (
          <div key={item.title} className="home-page__daily-use__item">
            <h4>{item.title}</h4>
            <p>{item.paragraph}</p>
          </div>
        ))}
      </div>
      <div className="home-page__daily-use__quote">
        <p>
          {`"Démocratique, la donnée améliore le service public en interconnectant
          la puissance publique et l'usager"`}
        </p>
        <p>
          Mission Bothorel, Pour une politique publique de la donnée, décembre
          2020
        </p>
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="columns home-page__footer">
      <p className="column is-6">
        {`Rejoignez le portail de l'intelligence collective des agents publics`}
      </p>
      <div className="column is-3">
        <LoginLink />
      </div>
    </div>
  );
};
