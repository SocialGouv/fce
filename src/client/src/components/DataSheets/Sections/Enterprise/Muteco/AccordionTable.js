import React, { useState } from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleDown
} from "@fortawesome/pro-solid-svg-icons";

const AccordionTable = ({ procedure, hasTypeColumn = false }) => {
  const [isActiveAccordion, setIsActiveAccordion] = useState(false);

  return (
    <>
      <tbody>
        <tr>
          {hasTypeColumn && (
            <td className="w-15">
              <Value value={procedure.type} />
            </td>
          )}
          <td className="has-text-right w-10">
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
          <td className="has-text-right w-10">
            <Value value={procedure.date_jugement} />
          </td>
          <td className="has-text-right w-10">
            <Value value={procedure.nombre_de_ruptures} nonEmptyValues="0" />
          </td>
          <td className="has-text-link w-10">
            <div
              onClick={() => setIsActiveAccordion(!isActiveAccordion)}
              className="has-text-right accordion-header"
            >
              <Value value={procedure.etablissements.length} />
              <FontAwesomeIcon
                icon={
                  isActiveAccordion ? faChevronCircleDown : faChevronCircleLeft
                }
                className="ml-2"
              />
            </div>
          </td>
        </tr>
      </tbody>
      <tbody className="accordion-container">
        {isActiveAccordion &&
          procedure.etablissements.map(etablissement => (
            <tr key={etablissement.siret}>
              <td colSpan={hasTypeColumn ? 6 : 5} />
              <td className="has-text-right">
                {etablissement.nombre_de_ruptures}
              </td>
              <td className="has-text-link has-text-right">
                <Value
                  value={etablissement.siret}
                  link={`/establishment/${etablissement.siret}`}
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
