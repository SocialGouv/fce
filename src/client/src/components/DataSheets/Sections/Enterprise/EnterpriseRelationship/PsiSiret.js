import { sortBy } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Button from "../../../../shared/Button/Button";
import { PsiSiretTable } from "./PsiSiretTable";

export const PsiSiret = ({ psi, years }) => {
  const numberOfEstablishmentsWithPsi = psi.length;
  const [isVisiblePsiTable, setIsVisiblePsiTable] = useState(
    numberOfEstablishmentsWithPsi < 10
  );

  const psiCurrentYear = sortBy(
    psi.filter((psi) => psi.salaries_annee_courante > 0),
    "etablissement.etatadministratifetablissement"
  );

  const psiLastYear = sortBy(
    psi.filter((psi) => psi.salaries_annee_precedente > 0),
    "etablissement.etatadministratifetablissement"
  );

  return (
    <div className="psi-siret">
      <div className="column">
        <div className="psi-siret__label">
          Établissement(s) identifié(s) comme lieu de réalisation d&apos;au
          moins une PSI en {years.currentYear} ou {years.lastYear}
        </div>
        <p className="psi__description">
          Directement pour le compte de l&apos;entreprise et/ou pour une autre
          entreprise donneur d&apos;ordre
        </p>
      </div>
      {numberOfEstablishmentsWithPsi > 9 && (
        <div className="psi-siret__button-wrapper">
          <Button
            onClick={() => setIsVisiblePsiTable((prevState) => !prevState)}
            value={
              isVisiblePsiTable
                ? "Cacher la liste des établissements"
                : "Afficher la liste des établissements"
            }
            buttonClasses="is-primary"
          />
        </div>
      )}

      <PsiSiretTable
        psi={psiCurrentYear}
        year={years.currentYear}
        isVisiblePsiTable={isVisiblePsiTable}
      />

      <PsiSiretTable
        psi={psiLastYear}
        year={years.lastYear}
        isVisiblePsiTable={isVisiblePsiTable}
      />
    </div>
  );
};

PsiSiret.propTypes = {
  psi: PropTypes.array.isRequired,
  years: PropTypes.shape({
    currentYear: PropTypes.number.isRequired,
    lastYear: PropTypes.number.isRequired,
  }).isRequired,
};
