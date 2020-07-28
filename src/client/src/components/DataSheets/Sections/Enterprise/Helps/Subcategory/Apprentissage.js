import React from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";

import Data from "../../../SharedComponents/Data";
import Subcategory from "../../../SharedComponents/Subcategory";
import State from "../../../SharedComponents/State";
import SeeDetailsLink from "../../../SharedComponents/SeeDetailsLink";
import { getCustomPastYear } from "../../../../../../helpers/Date/Date";
import { getEstablishment } from "../../../../../../helpers/Enterprise";
import { arraySum } from "../../../../../../helpers/utils";

const Apprentissage = ({ apprentissage, etablissements }) => {
  const total = apprentissage
    ? apprentissage.reduce((total, { signes }) => {
        return Object.values(signes).reduce(
          (total, nbApprentissage) => total + nbApprentissage,
          total
        );
      }, 0)
    : 0;

  const hasApprentissage = !!total;

  return (
    <>
      <Subcategory subtitle="Apprentissage">
        <Data
          name={`Embauche en contrat d'apprentissage depuis ${getCustomPastYear(
            2
          )}`}
          value={hasApprentissage}
          columnClasses={["is-7", "is-5"]}
          sourceSi="Ari@ne"
        />
        {hasApprentissage && (
          <table className="table is-fullwidth is-hoverable mt-3">
            <thead>
              <tr>
                <th className="th">Siret</th>
                <th className="th table__center-cell">État</th>
                <th className="th">Commune</th>
                <th className="th has-text-right">Nombre de contrats</th>
                <th className="th see-details"></th>
              </tr>
            </thead>
            <tbody>
              {apprentissage.map(({ siret, signes }) => {
                const establishment = getEstablishment(siret, etablissements);
                const etat = _get(establishment, "etat_etablissement");
                const codePostal = _get(
                  establishment,
                  "adresse_composant.code_postal"
                );
                const localite = _get(
                  establishment,
                  "adresse_composant.localite"
                );

                return (
                  <tr key={siret}>
                    <td>{siret}</td>
                    <td className="table__center-cell">
                      {etat && <State state={etat} />}
                    </td>
                    <td>{`${codePostal ? codePostal : ""} ${
                      localite ? localite : ""
                    }`}</td>
                    <td className="has-text-right">
                      {arraySum(Object.values(signes))}
                    </td>
                    <td className="has-text-centered">
                      <SeeDetailsLink link={`/establishment/${siret}/#helps`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Subcategory>
    </>
  );
};

Apprentissage.propTypes = {
  etablissements: PropTypes.arrayOf(PropTypes.object).isRequired,
  apprentissage: PropTypes.arrayOf(PropTypes.object)
};

export default Apprentissage;
