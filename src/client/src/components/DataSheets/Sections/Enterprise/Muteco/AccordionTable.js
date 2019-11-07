import React, { useState } from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faChevronCircleDown
} from "@fortawesome/fontawesome-pro-solid";

import { countValuesInArray } from "../../../../../helpers/utils";

const AccordionTable = ({ pse }) => {
  const [isActiveAccordion, setIsActiveAccordion] = useState(false);

  const rupturesContrats =
    countValuesInArray(pse.establishments, ["contrats_ruptures_fin"]) > 0
      ? countValuesInArray(pse.establishments, ["contrats_ruptures_fin"])
      : countValuesInArray(pse.establishments, ["contrats_ruptures_debut"]);

  return (
    <>
      <tbody>
        <tr>
          <td>
            <Value value={pse.dossier.numero_de_dossier} />
          </td>
          <td className="has-text-centered">
            <Value value={pse.dossier.date_enregistrement} />
          </td>
          <td className="has-text-centered">
            <Value value={pse.dossier.situation_juridique} />
          </td>
          <td className="has-text-centered">
            <Value
              value={
                pse.dossier.date_de_jugement
                  ? pse.dossier.date_de_jugement
                  : "-"
              }
            />
          </td>
          <td className="has-text-centered w-20">
            <Value value={rupturesContrats} nonEmptyValues="0" />
          </td>
          <td className="has-text-centered has-text-link">
            <div
              onClick={() => setIsActiveAccordion(!isActiveAccordion)}
              className="accordion-header"
            >
              <Value value={pse.establishments.length} />
              {isActiveAccordion ? (
                <FontAwesomeIcon icon={faChevronCircleDown} className="ml-2" />
              ) : (
                <FontAwesomeIcon icon={faChevronCircleLeft} className="ml-2" />
              )}
            </div>
          </td>
        </tr>
      </tbody>
      <tbody className="accordion-container">
        {isActiveAccordion &&
          pse.establishments.map(establishment => (
            <tr key={establishment.siret}>
              <td colSpan={4} />
              <td className="has-text-centered w-20">
                {establishment.contrats_ruptures_fin > 0
                  ? establishment.contrats_ruptures_fin
                  : establishment.contrats_ruptures_debut}
              </td>
              <td className="has-text-centered has-text-link">
                <Value
                  value={establishment.siret}
                  link={`establishment/${establishment.siret}`}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

AccordionTable.propTypes = {
  pse: PropTypes.object.isRequired
};

export default AccordionTable;
