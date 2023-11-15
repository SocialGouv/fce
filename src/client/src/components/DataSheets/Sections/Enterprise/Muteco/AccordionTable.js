import "./AccordionTable.scss";

import PropTypes from "prop-types";
import React, { useState } from "react";

import { formatSiret } from "../../../../../helpers/utils";
import {
  computeTotalRuptures,
  getDateEnregistrement,
  getDateJugement,
  getEtat,
  getNumero,
  getSituationJuridique,
  getTypeLabel,
} from "../../../../../utils/rupco/rupco";
import ArrowDown from "../../../../shared/Icons/ArrowDown.jsx";
import ArrowUp from "../../../../shared/Icons/ArrowUp.jsx";
import Value from "../../../../shared/Value";

const AccordionTable = ({ procedure, hasTypeColumn = false }) => {
  const [isActiveAccordion, setIsActiveAccordion] = useState(false);

  const onKeyDown = (e) => {
    if (e.code === "Space") {
      setIsActiveAccordion(!isActiveAccordion);
    }
  };

  return (
    <>
      <tbody>
        <tr>
          {hasTypeColumn && (
            <td>
              <Value value={getTypeLabel(procedure[0])} />
            </td>
          )}
          <td>
            <Value value={getDateEnregistrement(procedure[0])} />
          </td>
          <td>
            <Value value={getNumero(procedure[0])} />
          </td>
          <td>
            <Value value={getEtat(procedure[0])} />
          </td>
          <td>
            <Value value={getSituationJuridique(procedure[0])} />
          </td>
          <td>
            <Value value={getDateJugement(procedure[0])} />
          </td>
          <td>
            <Value
              value={computeTotalRuptures(procedure)}
              nonEmptyValues="0"
              hasNumberFormat
            />
          </td>
          <td className="has-text-link">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onClick={() => setIsActiveAccordion(!isActiveAccordion)}
              className="accordion-table__header"
            >
              <Value value={procedure.length} hasNumberFormat />
              {isActiveAccordion ? <ArrowUp /> : <ArrowDown />}
            </div>
          </td>
        </tr>
      </tbody>
      <tbody>
        {isActiveAccordion &&
          procedure.map(
            ({
              siret,
              nombre_de_ruptures_de_contrats_en_debut_de_procedure,
              nombre_de_ruptures_de_contrats_en_fin_de_procedure,
            }) => (
              <tr key={siret} className="sub-table">
                <td colSpan={hasTypeColumn ? 6 : 5} />
                <td>
                  {nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
                    nombre_de_ruptures_de_contrats_en_debut_de_procedure}
                </td>
                <td className="text has-text-right">
                  <Value
                    value={formatSiret(siret)}
                    link={`/establishment/${siret}/#muteco`}
                  />
                </td>
              </tr>
            )
          )}
      </tbody>
    </>
  );
};

AccordionTable.propTypes = {
  hasTypeColumn: PropTypes.bool,
  procedure: PropTypes.array.isRequired,
};

export default AccordionTable;
