import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import ActivitePartielle from "./ActivitePartielle";
import Lice from "./Lice";
import Pse from "./Pse";
import Rcc from "./Rcc";

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
        <Pse pseList={enterprise.pse} />
        <Lice liceList={enterprise.lice} />
        <Rcc rccList={enterprise.rcc} />
      </div>
    </section>
  );
};

EnterpriseMuteco.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterpriseMuteco;
