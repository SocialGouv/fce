import "./psi.scss";

import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import Subcategory from "../../SharedComponents/Subcategory";
import { PsiSiret } from "./PsiSiret";

const Psi = ({ psi, establishments, sources, entreprise }) => {
  if (!sources.SIPSI) return "";

  const currentYear = Number(sources.SIPSI.date.split("/").pop());
  const lastYear = currentYear - 1;

  const hasPsi = Boolean(
    entreprise?.psi?.salaries_annee_courante ||
      entreprise?.psi?.salaries_annee_precedente
  );

  const establishmentsWithPsi = psi.establishments.length
    ? psi.establishments
        .map((psiEstablishment) => {
          const establishmentInfos = establishments.find(
            (enterpriseEstablishment) =>
              enterpriseEstablishment.siret === psiEstablishment.siret
          );

          return {
            ...psiEstablishment,
            ...(establishmentInfos
              ? {
                  commune: `${establishmentInfos.adresse_composant.code_postal} ${establishmentInfos.adresse_composant.localite}`,
                  etat: establishmentInfos.etat_etablissement,
                }
              : {
                  commune: "-",
                  etat: "-",
                }),
          };
        })
        // closed establishments last
        .sort((a, z) => a.etat.localeCompare(z.etat))
    : [];

  const establishmentsWithPsiCurrentYear = establishmentsWithPsi.filter(
    (establishment) => establishment.current_year
  );

  const establishmentsWithPsiLastYear = establishmentsWithPsi.filter(
    (establishment) => establishment.last_year
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
                          {entreprise.psi.salaries_annee_courante}
                        </td>
                        <td className="has-text-right">
                          {entreprise.psi.salaries_annee_precedente}
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
                lastYear: establishmentsWithPsiLastYear,
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
  entreprise: PropTypes.object.isRequired,
  establishments: PropTypes.array.isRequired,
  psi: PropTypes.object.isRequired,
  sources: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    establishments: state.enterprise.current.etablissements,
    psi: state.psi,
    sources: state.sources,
  };
};

export default connect(mapStateToProps, null)(Psi);
