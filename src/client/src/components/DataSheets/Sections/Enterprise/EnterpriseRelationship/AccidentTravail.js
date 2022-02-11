import "./psi.scss";

import { prop, sum } from "lodash/fp";
import PropTypes from "prop-types";
import React from "react";

import { renderIfSiren } from "../../../../../helpers/hoc/renderIfSiren";
import {
  getCity,
  getSiret,
  getState,
} from "../../../../../utils/establishment/establishment";
import Data from "../../SharedComponents/Data";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import { useAccidentsTravailBySiren } from "./AccidentTravail.gql";

const getWorkAccidentsTotal = (workAccidents) =>
  sum(workAccidents.map(prop("total")));

const AccidentTravail = ({ entreprise: { siren } }) => {
  const { data, error, loading } = useAccidentsTravailBySiren(siren);

  if (error || loading) {
    return null;
  }

  const accidents = data.accidents_travail;

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
          />
          <div className="section-datas__list-item">
            {accidents && accidents.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>SIRET</th>
                    <th>Etat</th>
                    <th>Commune</th>
                    <th>{"Nb d'accidents du travail"}</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {accidents.map((data) => (
                    <tr key={getSiret(data.etablissement)}>
                      <td>{getSiret(data.etablissement)}</td>
                      <td className="table-cell--center-cell">
                        <State state={getState(data.etablissement)} />
                      </td>
                      <td>{getCity(data.etablissement)}</td>
                      <td>{data.total}</td>
                      <td className="see-details">
                        <SeeDetailsLink
                          link={`/establishment/${getSiret(
                            data.etablissement
                          )}/#work-accidents`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
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

export default renderIfSiren(AccidentTravail);
