import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import PsiTable from "./PsiTable";

import "./psi.scss";

const Psi = ({ psi, establishments }) => {
  const hasPsi = Boolean(psi.enterprise);

  const establishmentsWithPsi = hasPsi
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
    : null;

  return (
    <Subcategory
      subtitle="Prestations de services internationales (PSI)"
      sourceCustom="DGT/SIPSI 8/02/2021"
    >
      <PgApiDataHandler isLoading={psi.isLoading} error={psi.error}>
        <Data
          name={`Entreprise ayant au moins un contrat de PSI avec une entreprise étrangère en 2020`}
          className="psi__data"
          columnClasses={["is-10", "is-2"]}
          value={hasPsi ? "Oui" : "Non"}
        />
        {hasPsi && (
          <>
            <Data
              name={`Nb total de salariés distincts détachés auprès de l'entreprise en 2020`}
              description={
                <div className="psi__description">
                  <p>
                    Dans le cadre de la réalisation d'une prestation les
                    salariés peuvent être détachés sur :
                  </p>
                  <ul>
                    <li>un ou plusieurs établissements de l'entreprise</li>
                    <li>
                      un ou plusieurs établissements d'une autre entreprise
                      donneur d'ordre dans le cas d'une sous traitance
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
              value={psi.enterprise}
            />
            <PsiTable establishments={establishmentsWithPsi} />
          </>
        )}
      </PgApiDataHandler>
    </Subcategory>
  );
};

Psi.propTypes = {
  psi: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    psi: state.psi,
    establishments: state.enterprise.current.etablissements
  };
};

export default connect(mapStateToProps, null)(Psi);
