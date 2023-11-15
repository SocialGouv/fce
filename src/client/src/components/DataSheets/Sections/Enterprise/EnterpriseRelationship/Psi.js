import "./psi.scss";

import { getYear, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../SharedComponents/Subcategory";
import { usePsiEntreprise } from "./Psi.gql";
import { PsiSiret } from "./PsiSiret";

const Psi = ({ entreprise }) => {
  const { loading, data, error } = usePsiEntreprise(entreprise.siren);

  if (loading || error) {
    return null;
  }

  const currentYear = getYear(parseISO(data.psi_update.date));
  const lastYear = currentYear - 1;

  const hasPsi = data.psi_siret?.length > 0;

  const psiCurrentYear = data.psi_siret.filter(
    (psi) => psi.salaries_annee_courante > 0
  );

  const psiLastYear = data.psi_siret.filter(
    (psi) => psi.salaries_annee_precedente > 0
  );

  return (
    <div id="psi" className="psi">
      <Subcategory
        subtitle="Prestations de services internationales (PSI)"
        sourceSi="SIPSI"
      >
        <Data
          name={`Entreprise ayant au moins un contrat de PSI avec une entreprise étrangère`}
          className="psi__data has-no-border"
          columnClasses={["is-10", "is-2"]}
          value={hasPsi ? "Oui" : "Non"}
        />
        {hasPsi && (
          <>
            <Data
              name={
                <span className="psi__name">
                  {` Nb total de salariés distincts détachés auprès de l'entreprise`}
                </span>
              }
              description={
                <div className="psi__description">
                  <p>
                    Dans le cadre de la réalisation d&apos;une prestation les
                    salariés peuvent être détachés sur :
                  </p>
                  <ul>
                    <li>un ou plusieurs établissements de l&apos;entreprise</li>
                    <li>
                      un ou plusieurs établissements d&apos;une autre entreprise
                      donneur d&apos;ordre dans le cas d&apos;une sous traitance
                    </li>
                    <li>
                      un chantier ou lieu temporaire de travail non rattaché à
                      un établissement
                    </li>
                  </ul>
                </div>
              }
              className="psi__data has-no-border"
              columnClasses={["is-10", "is-2"]}
              value={
                <NonBorderedTable className="table is-bordered psi-siren-table">
                  <thead>
                    <tr>
                      <th className="th has-text-right">{currentYear}</th>
                      <th className="th has-text-right">{lastYear}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-cell--center-cell">
                        {data.psi_siren?.salaries_annee_courante}
                      </td>
                      <td className="table-cell--center-cell">
                        {data.psi_siren?.salaries_annee_precedente}
                      </td>
                    </tr>
                  </tbody>
                </NonBorderedTable>
              }
            />
          </>
        )}
        {Boolean(psiCurrentYear.length || psiLastYear.length) && (
          <PsiSiret psi={data.psi_siret} years={{ currentYear, lastYear }} />
        )}
      </Subcategory>
    </div>
  );
};

Psi.propTypes = {
  entreprise: PropTypes.object.isRequired,
};

export default Psi;
