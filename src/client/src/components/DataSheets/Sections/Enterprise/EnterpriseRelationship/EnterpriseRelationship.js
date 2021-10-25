import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/pro-solid-svg-icons";
import Agreements from "./Agreements";
import Psi from "./Psi";
import Egapro from "./Egapro";
import { CollectiveAgreements } from "./CollectiveAgreements";

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
    </div>
  </section>
);

EnterpriseRelationship.propTypes = {
  enterprise: PropTypes.object.isRequired,
  egapro: PropTypes.object.isRequired,
};

export default EnterpriseRelationship;
