import React from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/pro-solid-svg-icons";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import Source from "../../../../../containers/Source";
import { getLastInteraction } from "../../../../../helpers/Interactions";
import Config from "../../../../../services/Config";

import "./direccte.scss";

const Direccte = ({ establishment }) => {
  const lastInteractions = {
    T: {
      ...getLastInteraction(establishment.interactions_T),
      source: "Wiki'T"
    },
    C: {
      ...getLastInteraction(establishment.interactions_C),
      source: "SORA"
    },
    "3E_SEER": {
      ...getLastInteraction(establishment.interactions_3E_SEER),
      source: "EOS"
    },
    "3E_SRC": {
      ...getLastInteraction(establishment.interactions_3E_SRC),
      source: "MDF"
    }
  };

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
          <Data
            name="Unité de contrôle compétente (inspection du travail)"
            value={establishment.unite_controle_competente}
            columnClasses={["is-6", "is-6"]}
            sourceSi="Siene"
          />

          {_get(establishment, "totalInteractions.total") === 0 ? (
            <Data
              name={
                <div>
                  <div>
                    Dernier contrôle ou visite au cours des 24 derniers mois
                  </div>
                  <div>(Pôle T, Pôle C et Pôle E - SEER)</div>
                </div>
              }
              value="pas de contrôle connu"
              columnClasses={["is-6", "is-6"]}
            />
          ) : (
            <dl className="data dl columns direccte-interactions__title">
              <dt className={`dt column`}>
                Dernier contrôle ou visite au cours des 24 derniers mois (Pôle
                T, Pôle C, Pôle E)
              </dt>
            </dl>
          )}

          {!!(
            establishment.interactions && establishment.interactions.length
          ) && (
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
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(lastInteractions).map(
                  ([pole, lastInteraction]) => (
                    <tr key={pole}>
                      <td>
                        <Value value={pole} />
                      </td>
                      <td>
                        <Value value={lastInteraction.date} />
                      </td>
                      <td>
                        <Value value={lastInteraction.unite} />
                      </td>
                      <td>
                        <Value
                          value={
                            Config.get("poleSrcControlType")[
                              lastInteraction.type
                            ]
                          }
                        />
                        {lastInteraction.nature && lastInteraction.cible && (
                          <div className="direccte-interactions-establishment__control-nature">
                            <span>Nature du contrôle : </span>
                            <Value
                              value={`${lastInteraction.cible} - ${lastInteraction.nature}`}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        <Value value={lastInteraction.agent} />
                      </td>
                      <td>
                        <Source si={lastInteraction.source} isTableCell />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          )}
        </Subcategory>
      </div>
    </section>
  );
};

Direccte.propTypes = {
  establishment: PropTypes.object
};

export default Direccte;
