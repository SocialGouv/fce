import _get from "lodash.get";
import PropTypes from "prop-types";
import React from "react";

import { getCustomPastYear } from "../../../../../../helpers/Date/Date";
import { getEstablishment } from "../../../../../../helpers/Enterprise";
import { arraySum, formatSiret } from "../../../../../../helpers/utils";
import Data from "../../../SharedComponents/Data";
import SeeDetailsLink from "../../../SharedComponents/SeeDetailsLink";
import State from "../../../SharedComponents/State";
import Subcategory from "../../../SharedComponents/Subcategory";
import Table from "../../../SharedComponents/Table";

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
          <Table>
            <thead>
              <tr>
                <th className="th">Siret</th>
                <th className="th table-cell--center-cell">État</th>
                <th className="th">Commune</th>
                <th className="th has-text-right">Nombre de contrats</th>
                <th className="th see-details" />
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
                    <td className="table-cell--nowrap">{formatSiret(siret)}</td>
                    <td className="table-cell--center-cell">
                      {etat && <State state={etat} />}
                    </td>
                    <td>{`${codePostal ? codePostal : ""} ${
                      localite ? localite : ""
                    }`}</td>
                    <td className="has-text-right">
                      {arraySum(Object.values(signes))}
                    </td>
                    <td className="see-details">
                      <SeeDetailsLink link={`/establishment/${siret}/#helps`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Subcategory>
    </>
  );
};

Apprentissage.propTypes = {
  apprentissage: PropTypes.arrayOf(PropTypes.object),
  etablissements: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Apprentissage;
