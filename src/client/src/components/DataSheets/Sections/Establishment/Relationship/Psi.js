import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink/SeeDetailsLink";

import "./psi.scss";

const Psi = ({ psi, siret, sources }) => {
  const siren = siret.slice(0, 9);
  const currentYear = Number(sources.SIPSI.date.split("/").pop());
  const lastYear = currentYear - 1;

  const establishmentPsi = psi.establishments?.find(
    establishment => establishment.siret === siret
  );

  const hasPsi = Boolean(
    establishmentPsi?.current_year || establishmentPsi?.last_year
  );
  const isEnterpriseWithPsi = Boolean(
    psi.enterprise.current_year || psi.enterprise.last_year
  );

  return (
    <div id="psi" className="psi">
      <Subcategory
        subtitle="Prestations de services internationales (PSI)"
        sourceSi="SIPSI"
      >
        <PgApiDataHandler isLoading={psi.isLoading} error={psi.error}>
          <Data
            name={`Etablissement identifié comme lieu d'une ou plusieurs PSI`}
            description={
              <p className="psi__description">
                (directement pour le compte de l&apos;entreprise et/ou pour une
                autre entreprise donneur d&apos;ordre)
              </p>
            }
            className="psi__data"
            columnClasses={["is-10", "is-2"]}
            value={hasPsi ? "Oui" : "Non"}
          />
          {!!establishmentPsi?.current_year && (
            <Data
              name={`Nombre de salariés distincts détachés en ${currentYear}`}
              className="psi__data"
              columnClasses={["is-10", "is-2"]}
              value={establishmentPsi.current_year}
            />
          )}
          {!!establishmentPsi?.last_year && (
            <Data
              name={`Nombre de salariés distincts détachés en ${lastYear}`}
              className="psi__data"
              columnClasses={["is-10", "is-2"]}
              value={establishmentPsi.last_year}
            />
          )}

          <Data
            name={`Entreprise identifiée comme donneur d'ordre direct d'une ou plusieurs
          PSI`}
            description={
              isEnterpriseWithPsi && (
                <SeeDetailsLink
                  link={`/enterprise/${siren}/#psi`}
                  text="Voir les informations de l'entreprise"
                />
              )
            }
            className="psi__data"
            columnClasses={["is-10", "is-2"]}
            value={isEnterpriseWithPsi ? "Oui" : "Non"}
          />
        </PgApiDataHandler>
      </Subcategory>
    </div>
  );
};

Psi.propTypes = {
  psi: PropTypes.object.isRequired,
  siret: PropTypes.string.isRequired,
  sources: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    psi: state.psi,
    sources: state.sources
  };
};

export default connect(mapStateToProps, null)(Psi);
