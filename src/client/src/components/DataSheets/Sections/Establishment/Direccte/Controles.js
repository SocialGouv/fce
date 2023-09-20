import "./controles.scss";

import { mapValues } from "lodash";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Source from "../../../../../containers/Source";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import {
  getControlLabel,
  getInteractionSource,
  getLatestInteraction,
  getMotifLabel,
} from "../../../../../utils/interactions/interactions";
import Value from "../../../../shared/Value";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../SharedComponents/Subcategory";
import { useControles } from "./Controles.gql";

const Controles = ({ siret }) => {
  const { loading, data: interactions, error } = useControles(siret);
  const [accordionOpen, setAccordionOpen] = useState(false);

  if (loading || error) {
    return null;
  }

  const normalizedInteractions = mapValues(interactions, getLatestInteraction);

  return (
    <section
      id="direccte"
      className="data-sheet__bloc_section direccte-interactions-establishment"
    >
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"  Visites et Contrôles de la DREETS/DDETS"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <Subcategory>
            <div className=" direccte-interactions__title">
              <span className="text">
                Dernier contrôle ou visite au cours des 24 derniers mois (Pôle
                T, Pôle C, Pôle 3E)
              </span>
            </div>
            <div className="data-sheet--table data-sheet--table-to-left">
              <NonBorderedTable className="direccte-interactions-establishment__table">
                <thead>
                  <tr>
                    <th>Pôle</th>
                    <th>Date</th>
                    <th>Unité</th>
                    <th>Type</th>
                    <th>Agent</th>
                    <th>Source Date de mise à jour</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(normalizedInteractions).map(
                    ([pole, lastInteraction]) => (
                      <tr key={pole}>
                        <td>
                          <Value value={getControlLabel(pole)} />
                        </td>
                        <td>
                          <Value value={lastInteraction.date} />
                        </td>
                        <td>
                          <Value value={lastInteraction.unite} />
                        </td>
                        <td>
                          <Value value={getMotifLabel(lastInteraction.motif)} />
                          {lastInteraction.nature && lastInteraction.cible && (
                            <>
                              <div className="direccte-interactions-establishment__control-nature">
                                <span>Nature du contrôle : </span>
                                <Value
                                  value={`${lastInteraction.cible} - ${lastInteraction.nature}`}
                                />
                              </div>
                              <div className="direccte-interactions-establishment__control-nature">
                                <Value
                                  value={
                                    lastInteraction.clos
                                      ? "Contrôle Clos"
                                      : "Contrôle en cours"
                                  }
                                />
                              </div>
                            </>
                          )}
                        </td>
                        <td>
                          <Value value={lastInteraction.agent} />
                        </td>
                        <td>
                          <Source si={getInteractionSource(pole)} isTableCell />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </NonBorderedTable>
            </div>
          </Subcategory>
        </div>
      )}
    </section>
  );
};

Controles.propTypes = {
  siret: PropTypes.string.isRequired,
};
export default renderIfSiret(Controles);
