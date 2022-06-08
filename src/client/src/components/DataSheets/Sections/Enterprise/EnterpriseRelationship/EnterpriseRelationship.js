import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import Agreements from "./Agreements";
import { CollectiveAgreements } from "./CollectiveAgreements";
import Egapro from "./Egapro";
import Psi from "./Psi";
import WorkAccident from "./WorkAccident";

const EnterpriseRelationship = ({
  enterprise,
  egapro,
  enterprise: { idcc },
}) => (
  <section id="relationship" className="data-sheet__section">
    <div className="section-header">
      <span className="icon">
        <FontAwesomeIcon icon={faUsers} />
      </span>
      <h2 className="title">Relation travail</h2>
    </div>
    <div className="section-datas">
      <Egapro egapro={egapro} />
      <CollectiveAgreements idccList={idcc} />
      <Agreements enterprise={enterprise} />
      <Psi />
      <WorkAccident
        siren={enterprise.siren}
        etablissements={enterprise.etablissements}
      />
    </div>
  </section>
);

EnterpriseRelationship.propTypes = {
  egapro: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired,
};

export default EnterpriseRelationship;
