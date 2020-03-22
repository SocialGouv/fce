import React from "react";
import PropTypes from "prop-types";
import Mandataire from "./Mandataire";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/pro-solid-svg-icons";

const Items = ({ mandataires }) =>
  mandataires.map(mandataire => (
    <Mandataire mandataire={mandataire} key={mandataire.fonction} />
  ));

const Mandataires = ({ enterprise }) => {
  const mandataires = enterprise.mandataires_sociaux || [];

  return (
    <section id="mandataires" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Mandataires sociaux</h2>
      </div>
      <div className="section-datas">
        {mandataires.length > 1 ? (
          <Items mandataires={mandataires} />
        ) : (
          <p className="has-text-center">Aucun mandataire n{"'"}a été trouvé</p>
        )}
      </div>
    </section>
  );
};

Mandataires.propTypes = {
  enterprise: PropTypes.object.isRequired
};

Items.propTypes = {
  mandataires: PropTypes.array.isRequired
};

export default Mandataires;
