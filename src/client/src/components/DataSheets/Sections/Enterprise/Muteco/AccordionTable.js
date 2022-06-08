import "./AccordionTable.scss";

import {
  faChevronCircleDown,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <tr className="accordion-table__row">
          {hasTypeColumn && (
            <td>
              <Value value={getTypeLabel(procedure[0])} />
            </td>
          )}
          <td>
            <Value value={getDateEnregistrement(procedure[0])} />
          </td>
          <td className="has-text-right">
            <Value value={getNumero(procedure[0])} />
          </td>
          <td>
            <Value value={getEtat(procedure[0])} />
          </td>
          <td>
            <Value value={getSituationJuridique(procedure[0])} />
          </td>
          <td className="has-text-right">
            <Value value={getDateJugement(procedure[0])} />
          </td>
          <td className="has-text-right">
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
              className="has-text-right accordion-table__header"
            >
              <Value value={procedure.length} hasNumberFormat />
              <FontAwesomeIcon
                icon={
                  isActiveAccordion ? faChevronCircleDown : faChevronCircleLeft
                }
              />
            </div>
          </td>
        </tr>
      </tbody>
      <tbody className="accordion-table__container">
        {isActiveAccordion &&
          procedure.map(
            ({
              siret,
              nombre_de_ruptures_de_contrats_en_debut_de_procedure,
              nombre_de_ruptures_de_contrats_en_fin_de_procedure,
            }) => (
              <tr key={siret}>
                <td colSpan={hasTypeColumn ? 6 : 5} />
                <td className="has-text-right">
                  {nombre_de_ruptures_de_contrats_en_fin_de_procedure ||
                    nombre_de_ruptures_de_contrats_en_debut_de_procedure}
                </td>
                <td className="has-text-link has-text-right">
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
