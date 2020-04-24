import React from "react";
import PropTypes from "prop-types";
import Pse from "./Pse";
import Rcc from "./Rcc";
import Lice from "./Lice";
import ActivitePartielle from "./ActivitePartielle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/pro-solid-svg-icons";

const EnterpriseMuteco = ({ enterprise }) => {
  return (
    <section id="muteco" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUmbrella} />
        </span>
        <h2 className="title">Mutations Economiques</h2>
      </div>
      <div className="section-datas">
        <ActivitePartielle enterprise={enterprise} />
        <Pse enterprise={enterprise} />
        <Lice enterprise={enterprise} />
        <Rcc enterprise={enterprise} />
      </div>
    </section>
  );
};

EnterpriseMuteco.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default EnterpriseMuteco;
