import "./controles.scss";

import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mapValues } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import Source from "../../../../../containers/Source";
import { renderIfSiret } from "../../../../../helpers/hoc/renderIfSiret";
import {
  getControlLabel,
  getInteractionSource,
  getLatestInteraction,
  getMotifLabel,
} from "../../../../../utils/interactions/interactions";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import { useControles } from "./Controles.gql";

const Controles = ({ siret }) => {
  const { loading, data: interactions, error } = useControles(siret);

  if (loading || error) {
    return null;
  }

  const normalizedInteractions = mapValues(interactions, getLatestInteraction);

  return (
    <section
      id="direccte"
      className="data-sheet__section direccte-interactions-establishment"
    >
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faCalendarCheck} />
        </span>
        <h2 className="title">Visites et Contrôles de la Direccte</h2>
      </div>
      <div className="section-datas">
        <Subcategory>
          <dl className="data dl columns direccte-interactions__title">
            <dt className={`dt column`}>
              Dernier contrôle ou visite au cours des 24 derniers mois (Pôle T,
              Pôle C, Pôle 3E)
            </dt>
          </dl>
          <Table
            className="direccte-interactions-establishment__table"
            isBordered
          >
            <thead>
              <tr>
                <th className="has-text-right">Pôle</th>
                <th>Date</th>
                <th>Unité</th>
                <th>Type</th>
                <th>Agent</th>
                <th>
                  Source
                  <br />
                  Date de mise à jour
                </th>
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
          </Table>
        </Subcategory>
      </div>
    </section>
  );
};

Controles.propTypes = {
  siret: PropTypes.string.isRequired,
};
export default renderIfSiret(Controles);
