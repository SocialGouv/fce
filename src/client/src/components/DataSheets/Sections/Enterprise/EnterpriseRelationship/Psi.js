import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import { PsiSiret } from "./PsiSiret";

import "./psi.scss";

const Psi = ({ psi, establishments, sources }) => {
  const currentYear = Number(sources.SIPSI.date.split("/").pop());
  const lastYear = currentYear - 1;

  const hasPsi = Boolean(
    psi.enterprise.current_year || psi.enterprise.last_year
  );

  const establishmentsWithPsi = psi.establishments.length
    ? psi.establishments
        .map(psiEstablishment => {
          const { etat_etablissement, adresse_composant } = establishments.find(
            enterpriseEstablishment =>
              enterpriseEstablishment.siret === psiEstablishment.siret
          );

          return {
            ...psiEstablishment,
            etat: etat_etablissement,
            commune: `${adresse_composant.code_postal} ${adresse_composant.localite}`
          };
        })
        // closed establishments last
        .sort((a, z) => a.etat.localeCompare(z.etat))
    : [];

  const establishmentsWithPsiCurrentYear = establishmentsWithPsi.filter(
    establishment => establishment.current_year
  );

  const establishmentsWithPsiLastYear = establishmentsWithPsi.filter(
    establishment => establishment.last_year
  );

  return (
    <div id="psi" className="psi">
      <Subcategory
        subtitle="Prestations de services internationales (PSI)"
        sourceSi="SIPSI"
      >
        <PgApiDataHandler isLoading={psi.isLoading} error={psi.error}>
          <Data
            name={`Entreprise ayant au moins un contrat de PSI avec une entreprise étrangère`}
            className="psi__data"
            columnClasses={["is-10", "is-2"]}
            value={hasPsi ? "Oui" : "Non"}
          />
          {hasPsi && (
            <>
              <Data
                name={`Nb total de salariés distincts détachés auprès de l'entreprise`}
                description={
                  <div className="psi__description">
                    <p>
                      Dans le cadre de la réalisation d&apos;une prestation les
                      salariés peuvent être détachés sur :
                    </p>
                    <ul>
                      <li>
                        un ou plusieurs établissements de l&apos;entreprise
                      </li>
                      <li>
                        un ou plusieurs établissements d&apos;une autre
                        entreprise donneur d&apos;ordre dans le cas d&apos;une
                        sous traitance
                      </li>
                      <li>
                        un chantier ou lieu temporaire de travail non rattaché à
                        un établissement
                      </li>
                    </ul>
                  </div>
                }
                className="psi__data"
                columnClasses={["is-10", "is-2"]}
                value={
                  <table className="table is-bordered psi-siren-table">
                    <thead>
                      <tr>
                        <th className="th has-text-right">{currentYear}</th>
                        <th className="th has-text-right">{lastYear}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="has-text-right">
                          {psi.enterprise.current_year}
                        </td>
                        <td className="has-text-right">
                          {psi.enterprise.last_year}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                }
              />
            </>
          )}
          {Boolean(
            establishmentsWithPsiCurrentYear.length ||
              establishmentsWithPsiLastYear.length
          ) && (
            <PsiSiret
              establishments={{
                currentYear: establishmentsWithPsiCurrentYear,
                lastYear: establishmentsWithPsiLastYear
              }}
              years={{ currentYear, lastYear }}
            />
          )}
        </PgApiDataHandler>
      </Subcategory>
    </div>
  );
};

Psi.propTypes = {
  establishments: PropTypes.array.isRequired,
  psi: PropTypes.object.isRequired,
  sources: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    psi: state.psi,
    establishments: state.enterprise.current.etablissements,
    sources: state.sources
  };
};

export default connect(mapStateToProps, null)(Psi);
