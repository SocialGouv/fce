import React, { useState } from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleDown
} from "@fortawesome/pro-solid-svg-icons";

import "./AccordionTable.scss";
import { formatSiret } from "../../../../../helpers/utils";

const AccordionTable = ({ procedure, hasTypeColumn = false }) => {
  const [isActiveAccordion, setIsActiveAccordion] = useState(false);

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
          procedure.etablissements.map(etablissement => (
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
  procedure: PropTypes.object.isRequired,
  hasTypeColumn: PropTypes.bool
};

export default AccordionTable;
