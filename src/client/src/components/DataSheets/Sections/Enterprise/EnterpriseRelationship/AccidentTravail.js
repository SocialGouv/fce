import "./psi.scss";

import { prop, sum } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiren } from "../../../../../helpers/hoc/renderIfSiren.js";
import {
  getCity,
  getSiret,
  getState,
  isActive,
} from "../../../../../utils/establishment/establishment";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import Subcategory from "../../SharedComponents/Subcategory";
import { useAccidentsTravailBySiren } from "./AccidentTravail.gql";

const getWorkAccidentsTotal = (workAccidents) =>
  sum(workAccidents.map(prop("total")));

const AccidentTravail = ({ entreprise }) => {
  const { siren } = entreprise;
  const { data, error, loading } = useAccidentsTravailBySiren(siren);
  const shouldNotRender = useRenderIfSiren({ entreprise, siren });

  if (loading || error || shouldNotRender) {
    return null;
  }

  const accidents = data?.accidents_travail;

  return (
    <div>
      <Subcategory
        subtitle="Accidents du travail"
        sourceCustom="DGT / WikiT - 01/10/2021"
      >
        <div className="section-datas__list">
          <Data
            name={
              "Nb total d'accidents du travail déclarés par les différents établissements de l'entreprise"
            }
            columnClasses={["is-10", "is-2"]}
            value={accidents ? getWorkAccidentsTotal(accidents) : 0}
            className="has-no-border"
          />
          <div className="section-datas__list-item">
            {accidents && accidents.length > 0 && (
              <div className="data-sheet--table">
                <NonBorderedTable isScrollable={accidents.length > 6}>
                  <thead>
                    <tr>
                      <th>SIRET</th>
                      <th>Etat</th>
                      <th>Commune</th>
                      <th>{"Nb d'accidents du travail"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accidents.map((accidnt) => {
                      const etab = accidnt.etablissement;
                      const isEtablissementActive = isActive(etab);
                      const stateClass = isEtablissementActive
                        ? "icon--success"
                        : "icon--danger";
                      const stateText = isEtablissementActive
                        ? "ouvert"
                        : "fermé";
                      return (
                        <tr key={getSiret(accidnt.etablissement)}>
                          <td>
                            {" "}
                            <SeeDetailsLink
                              link={`/establishment/${getSiret(
                                accidnt.etablissement
                              )}/#work-accidents`}
                              text={getSiret(accidnt.etablissement)}
                            />
                          </td>
                          <td className="table-cell--center-cell">
                            {getState(etab) && (
                              <BadgeWithIcon
                                isTableBadge
                                text={stateText}
                                state={stateClass}
                              />
                            )}
                          </td>
                          <td>{getCity(accidnt.etablissement)}</td>
                          <td className="th table-cell--center-cell">
                            {accidnt.total}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </NonBorderedTable>
              </div>
            )}
          </div>
        </div>
      </Subcategory>
    </div>
  );
};

AccidentTravail.propTypes = {
  entreprise: PropTypes.shape({
    siren: PropTypes.string,
  }),
};

export default AccidentTravail;
