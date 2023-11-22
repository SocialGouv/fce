import "./psi.scss";

import { getYear, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

import { getSirenFromSiret } from "../../../../../utils/establishment/establishment";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink/SeeDetailsLink";
import Subcategory from "../../SharedComponents/Subcategory";
import { usePsi } from "./Psi.gql";

const Psi = ({ siret }) => {
  const { loading, data, error } = usePsi(siret);

  if (loading || error) {
    return null;
  }

  const currentYear = getYear(parseISO(data.psi_update.date));
  const lastYear = currentYear - 1;

  const hasPsi = Boolean(
    data.psi_siret?.salaries_annee_courante ||
      data.psi_siret?.salaries_annee_precedente
  );

  const isEnterpriseWithPsi = Boolean(
    data.psi_siren?.salaries_annee_courante ||
      data.psi_siren?.salaries_annee_precedente
  );

  return (
    <div id="psi" className="psi">
      <Subcategory
        subtitle="Prestations de services internationales (PSI)"
        sourceSi="SIPSI"
      >
        <PgApiDataHandler isLoading={loading} error={error}>
          <Data
            name={`Etablissement identifié comme lieu d'une ou plusieurs PSI`}
            description={
              <span className="psi__desc">
                (directement pour le compte de l&apos;entreprise et/ou pour une
                autre entreprise donneur d&apos;ordre)
              </span>
            }
            className="has-no-border psi__data"
            columnClasses={["is-6", "is-6", "psi__value"]}
            value={hasPsi ? "Oui" : "Non"}
          />
          {!!data.psi_siret?.salaries_annee_courante && (
            <Data
              name={`Nombre de salariés distincts détachés en ${currentYear}`}
              className=" has-no-border psi__data"
              columnClasses={["is-6", "is-6"]}
              value={data.psi_siret?.salaries_annee_courante}
            />
          )}
          {!!data.psi_siret?.salaries_annee_precedente && (
            <Data
              name={`Nombre de salariés distincts détachés en ${lastYear}`}
              className="has-no-border psi__data"
              columnClasses={["is-6", "is-6"]}
              value={data.psi_siret?.salaries_annee_precedente}
            />
          )}

          <Data
            name={`Entreprise identifiée comme donneur d'ordre direct d'une ou plusieurs
          PSI`}
            description={
              isEnterpriseWithPsi && (
                <SeeDetailsLink
                  link={`/enterprise/${getSirenFromSiret(siret)}/#psi`}
                  text="Voir les informations de l'entreprise"
                />
              )
            }
            className=" has-no-border psi__data"
            columnClasses={["is-6", "is-6", "psi__value"]}
            value={isEnterpriseWithPsi ? "Oui" : "Non"}
          />
        </PgApiDataHandler>
      </Subcategory>
    </div>
  );
};

Psi.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default Psi;
