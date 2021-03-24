import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";

import "./psi.scss";

const Psi = ({ psi, siret }) => {
  const establishmentPsi = psi.establishments?.find(
    establishment => establishment.siret === siret
  );

  const hasPsi = Boolean(establishmentPsi);

  return (
    <div id="psi">
      <Subcategory
        subtitle="Prestations de services internationales (PSI)"
        sourceCustom="DGT/SIPSI 8/02/2021"
      >
        <PgApiDataHandler isLoading={psi.isLoading} error={psi.error}>
          <Data
            name={`Etablissement identifié comme lieu d'une ou plusieurs PSI`}
            description={
              <p className="psi__description">
                (directement pour le compte de l'entreprise et/ou pour une autre
                entreprise donneur d'ordre)
              </p>
            }
            className="psi__data"
            columnClasses={["is-10", "is-2"]}
            value={hasPsi ? "Oui" : "Non"}
          />
          {hasPsi && (
            <Data
              name={`Nombre de salariés distincts détachés en 2020`}
              className="psi__data"
              columnClasses={["is-10", "is-2"]}
              value={establishmentPsi.salaries_distincts}
            />
          )}
        </PgApiDataHandler>
      </Subcategory>
    </div>
  );
};

Psi.propTypes = {
  psi: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    psi: state.psi
  };
};

export default connect(mapStateToProps, null)(Psi);
