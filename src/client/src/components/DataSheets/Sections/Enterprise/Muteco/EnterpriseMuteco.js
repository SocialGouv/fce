import PropTypes from "prop-types";
import React from "react";

import ActivitePartielle from "./ActivitePartielle";
import Lice from "./Lice";
import Pse from "./Pse";
import Rcc from "./Rcc";

const EnterpriseMuteco = ({ enterprise }) => {
  return (
    <section id="muteco" className="data-sheet__bloc_section">
      <div className="section-header">
        <h2 className="dark-blue-title">Mutations Economiques</h2>
      </div>
      <div className="section-datas">
        <ActivitePartielle enterprise={enterprise} />
        <Pse entreprise={enterprise} />
        <Lice entreprise={enterprise} />
        <Rcc entreprise={enterprise} />
      </div>
    </section>
  );
};

EnterpriseMuteco.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterpriseMuteco;
