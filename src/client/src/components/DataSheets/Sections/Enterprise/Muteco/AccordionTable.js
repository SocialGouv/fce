import "./AccordionTable.scss";

import {
  faChevronCircleDown,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { formatSiret } from "../../../../../helpers/utils";
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
              <Value value={procedure.type} />
            </td>
          )}
          <td>
            <Value value={procedure.date_enregistrement} />
          </td>
          <td className="has-text-right">
            <Value value={procedure.numero} />
          </td>
          <td>
            <Value value={procedure.etat} />
          </td>
          <td>
            <Value value={procedure.situation_juridique} />
          </td>
          <td className="has-text-right">
            <Value value={procedure.date_jugement} />
          </td>
          <td className="has-text-right">
            <Value
              value={procedure.nombre_de_ruptures}
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
              <Value value={procedure.etablissements.length} hasNumberFormat />
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
          procedure.etablissements.map((etablissement) => (
            <tr key={etablissement.siret}>
              <td colSpan={hasTypeColumn ? 6 : 5} />
              <td className="has-text-right">
                {etablissement.nombre_de_ruptures}
              </td>
              <td className="has-text-link has-text-right">
                <Value
                  value={formatSiret(etablissement.siret)}
                  link={`/establishment/${etablissement.siret}/#muteco`}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

AccordionTable.propTypes = {
  hasTypeColumn: PropTypes.bool,
  procedure: PropTypes.object.isRequired,
};

export default AccordionTable;
