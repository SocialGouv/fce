import React from "react";
import PropTypes from "prop-types";

import Button from "../shared/Button";
import "./homePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="columns home-page__block is-justify-content-space-between">
        <div className="column">LOGO</div>
        <Button
          className="button is-primary"
          value="Partager FCE avec un agent"
        />
      </div>

      <div className="home-page__summary home-page__block">
        <h2 className="block__title">
          Retrouvez les informations légales et administratives des entreprises
        </h2>
        <p>
          L'état civil, l'activité et les données de l'administration dans une
          seule fiche destinée aux agents publics
        </p>
        <Button className="button" value="Je me connecte" />
      </div>

      <div className="home-page__block is-justify-content-center has-text-centered">
        <h2 className="block__title">FCE en chiffres</h2>
        <div className="columns">
          <div className="column icon-item">
            <img
              src="https://static.vecteezy.com/ti/vecteur-libre/p1/512576-icone-de-profil-noir-glyphe-gratuit-vectoriel.jpg"
              width="200"
              heigth="200"
            />
            <p>20 millions d’entreprises 28 millions d’établissements</p>
          </div>
          <div className="column icon-item">
            <img
              src="https://static.vecteezy.com/ti/vecteur-libre/p1/512576-icone-de-profil-noir-glyphe-gratuit-vectoriel.jpg"
              width="200"
              heigth="200"
            />
            <p>
              + 5 millions de données collectées sur les effectifs, contrôles et
              aides
            </p>
          </div>
          <div className="column icon-item">
            <img
              src="https://static.vecteezy.com/ti/vecteur-libre/p1/512576-icone-de-profil-noir-glyphe-gratuit-vectoriel.jpg"
              width="200"
              heigth="200"
            />
            <p>+ 700 utilisateurs dans les DIRECCTE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {};

export default HomePage;
