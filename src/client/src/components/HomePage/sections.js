import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const LoginLink = () => (
  <div
    className="home-page__link"
    title="Les agents des DDETS(PP), merci d'utiliser votre adresse au format @direccte.gouv.fr"
  >
    <Link
      to="/login"
      title="Les agents des DDETS(PP), merci d'utiliser votre adresse au format @direccte.gouv.fr"
    >
      Je me connecte
    </Link>
  </div>
);

const RequestAccessLink = () => (
  <div className="home-page__link">
    <Link to="/request-access">{`Je demande l'accès`}</Link>
  </div>
);

export const IconItems = () => {
  return (
    <div className="home-page__section ">
      {/* <h2 className="home-page__blue-title">FCE en chiffres</h2> */}
      <div
        className="columns icons "
        style={{ height: "28VW", margin: "auto" }}
      >
        <iframe
          title="Report Section"
          width="100%"
          // height="90%"
          src="https://app.powerbi.com/view?r=eyJrIjoiNzdiNjg5YzgtNzk2OC00ZTkwLWEwOWYtNTBlOGM1ODc2ZjFlIiwidCI6IjAzNWU1MjkyLTVhMjUtNDUwOS1iYjA4LWE1NTVmN2QzMWE4YiJ9"
          allowFullScreen="true"
          style={{
            backgroundColor: "#ffffff !important",
            filter: "drop-shadow(0 1px 3px rgba(0, 0, 18, 0.16))",
            overflow: "hidden",
            padding: 0,
          }}
        />
      </div>
    </div>
  );
};

IconItems.propTypes = {
  isLoading: PropTypes.bool,
  users: PropTypes.number,
};

export const Summary = () => (
  <>
    <div className="home-page__summary home-page__section">
      <h3>
        Retrouvez les informations légales et administratives des entreprises
      </h3>
      <p>
        {`L'état civil, l'activité et les données de l'administration dans une seule
      fiche destinée aux agents publics`}
      </p>
    </div>
    <div className="columns home-page__action-links-container is-centered">
      <div className="column is-5">
        <div className="content">
          <div className="text-title">
            Je suis un agent en DREETS ou en DDETS ​
          </div>

          <LoginLink />
          <div className="text-explicatif">
            Pour obtenir un code par mail qui ne sera plus demandé pendant 30
            jours​
          </div>
        </div>
      </div>
      <div className="column is-1 divider-column">
        {" "}
        <div className="divider">
          <div className="divider-line" />
          <div className="divider-text">Ou</div>
          <div className="divider-line" />
        </div>
      </div>
      <div className="column is-5">
        <div className="content">
          <div className="text-title">
            Je suis en agent en DDETS, nouvel utilisateur de FCE​
          </div>
          <RequestAccessLink />
          <div className="text-explicatif">
            Pour obtenir l’autorisation (par mail) de se connecter au portail.​
          </div>
        </div>
      </div>
    </div>
  </>
);

export const HowItWork = () => {
  const items = [
    {
      index: "1",
      paragraph: "Je recherche un établissement suivants plusieurs critères",
      title: "PRATIQUE",
    },
    {
      index: "2",
      paragraph:
        "Je consulte les fiches associées : établissement et entreprise",
      title: "COLLABORATIF",
    },
    {
      index: "3",
      paragraph:
        "Je prends des décisions éclairées grâce aux différentes informations",
      title: "DÉCISIF",
    },
  ];

  const renderItems = (isTouch = false) =>
    items.map((item) => (
      <div className="column" key={item.title}>
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
          <div className="home-page__how-it-work__item columns is-centered">
            <div className="column home-page__how-it-work__item_column">
              <span>{item.index}</span>
              <p>{item.paragraph}</p>
            </div>
          </div>
        )}
      </div>
    ));

  return (
    <div className="home-page__how-it-work  particles">
      <div>
        <h2 className="home-page__white-title">Comment ça marche ?</h2>
        <div className="columns is-justify-content-center ">
          {renderItems()}
        </div>
        {/* <div className="is-justify-content-center is-hidden-desktop">
          {renderItems(true)}
        </div> */}
      </div>
    </div>
  );
};

export const DailyUse = () => {
  const items = [
    {
      paragraph:
        "Pour un établissement donné, j’accède très rapidement à une vision 360° des informations en provenance des autres services. Ces informations me permettent d’agir en connaissance de cause.",
      title: "AJUSTER LES ACTIONS AUPRÈS DES ENTREPRISES",
    },
    {
      paragraph:
        "Si nécessaire, je complète une information spécifique en demandant directement au service responsable du dispositif associé.",
      title: "FACILITER LES ÉCHANGES ENTRE LES SERVICES",
    },
    {
      paragraph:
        "Initier une fiche ministre ou préfet en un minimum de temps, faire émerger des idées d’outils de ciblage ou de tableaux de bords croisant les données de différents dispositifs métiers. ",
      title: "RESTITUER L’INFORMATION AUX DÉCIDEURS",
    },
  ];

  return (
    <div className="home-page__daily-use home-page__section-iframe ">
      <h2 className="home-page__blue-title">Quels usages au quotidien ?</h2>
      <div className="columns home-page__daily-use__items">
        {items.map((item) => (
          <div key={item.title} className="column  home-page__daily-use__item">
            <h4>{item.title}</h4>
            <p>{item.paragraph}</p>
          </div>
        ))}
      </div>
      <div className="home-page__daily-use__quote">
        <p>
          {`« Démocratique, la donnée améliore le service public en interconnectant
          la puissance publique et l'usager »`}
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
