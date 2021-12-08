import React from "react";
import PropTypes from "prop-types";
import { prop, sum } from "lodash/fp";
import { keyBy } from "lodash";
import Subcategory from "../../SharedComponents/Subcategory";
import PgApiDataHandler from "../../SharedComponents/PgApiDataHandler";
import "./psi.scss";
import Value from "../../../../shared/Value";
import Table from "../../SharedComponents/Table";
import { useAccidentTravailBySiren } from "../../../../../services/AccidentTravail/hooks";
import Data from "../../SharedComponents/Data";
import State from "../../SharedComponents/State";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

const getWorkAccidentsTotal = workAccidents =>
  sum(workAccidents.map(prop("total")));

const getEtablissementsData = (workAccidents, etablissements) => {
  const etablissementsMap = keyBy(etablissements, "siret");
  return workAccidents.map(accident => ({
    ...accident,
    ...etablissementsMap[accident.siret]
  }));
};

const WorkAccident = ({ siren, etablissements }) => {
  const { loading, data, error } = useAccidentTravailBySiren(siren);

  return (
    <div>
      <Subcategory
        subtitle="Accidents du travail"
        sourceCustom="DGT / WikiT - 01/10/2021"
      >
        <PgApiDataHandler isLoading={loading} error={error}>
          <div className="section-datas__list">
            <Data
              name={
                "Nb total d'accidents du travail déclarés par les différents établissements de l'entreprise"
              }
              columnClasses={["is-10", "is-2"]}
              value={
                data?.accidents_travail?.length
                  ? getWorkAccidentsTotal(data.accidents_travail)
                  : 0
              }
            />
            <div className="section-datas__list-item">
              {data?.accidents_travail?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>SIRET</th>
                      <th>Etat</th>
                      <th>Commune</th>
                      <th>{"Nb d'accidents du travail"}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log(
                      getEtablissementsData(
                        data.accidents_travail,
                        etablissements
                      )
                    )}
                    {getEtablissementsData(
                      data.accidents_travail,
                      etablissements
                    ).map(data => (
                      <tr key={data.siret}>
                        <td>{data.siret}</td>
                        <td className="table-cell--center-cell">
                          {data.etat_etablissement && (
                            <State state={data.etat_etablissement} />
                          )}
                        </td>
                        <td>{data.adresse_composant.localite}</td>
                        <td>{data.total}</td>
                        <td className="see-details">
                          <SeeDetailsLink
                            link={`/establishment/${data.siret}/#work-accidents`}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </PgApiDataHandler>
      </Subcategory>
    </div>
  );
};

WorkAccident.propTypes = {
  siren: PropTypes.string.isRequired,
  etablissements: PropTypes.array.isRequired
};

export default WorkAccident;
