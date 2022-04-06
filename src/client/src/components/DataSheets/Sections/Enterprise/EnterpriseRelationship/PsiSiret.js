import PropTypes from "prop-types";
import React, { useState } from "react";

import Button from "../../../../shared/Button/Button";
import { PsiSiretTable } from "./PsiSiretTable";

export const PsiSiret = ({ establishments, years }) => {
  const numberOfEstablishmentsWithPsi =
    establishments.currentYear.length + establishments.lastYear.length;
  const [isVisiblePsiTable, setIsVisiblePsiTable] = useState(
    numberOfEstablishmentsWithPsi < 10
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
        establishments={establishments.currentYear}
        year={years.currentYear}
        isVisiblePsiTable={isVisiblePsiTable}
      />

      <PsiSiretTable
        establishments={establishments.lastYear}
        year={years.lastYear}
        isVisiblePsiTable={isVisiblePsiTable}
      />
    </div>
  );
};

PsiSiret.propTypes = {
  establishments: PropTypes.shape({
    currentYear: PropTypes.array.isRequired,
    lastYear: PropTypes.array.isRequired,
  }).isRequired,
  years: PropTypes.shape({
    currentYear: PropTypes.number.isRequired,
    lastYear: PropTypes.number.isRequired,
  }).isRequired,
};
