import PropTypes from "prop-types";
import React from "react";

import { getCustomPastYear } from "../../../../../../helpers/Date";
import { renderIfSiren } from "../../../../../../helpers/hoc/renderIfSiren";
import { formatSiret } from "../../../../../../helpers/utils";
import {
  formatApprentissage,
  getEstablishmentSignedCount,
  getSignedTotal,
} from "../../../../../../utils/apprentissage/apprentissage";
import {
  getCity,
  getCodePostal,
  getSiret,
  getState,
} from "../../../../../../utils/establishment/establishment";
import Data from "../../../SharedComponents/Data";
import SeeDetailsLink from "../../../SharedComponents/SeeDetailsLink";
import State from "../../../SharedComponents/State";
import Subcategory from "../../../SharedComponents/Subcategory";
import Table from "../../../SharedComponents/Table";
import { useApprentissageBySiren } from "./Apprentissage.gql";

const Apprentissage = ({ entreprise: { siren } }) => {
  const { data, loading, error } = useApprentissageBySiren(siren);

  if (loading || error) {
    return null;
  }

  const formattedApprentissage = formatApprentissage(
    data.etablissements_apprentissage
  );
  const total = getSignedTotal(formattedApprentissage);
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
              {formattedApprentissage.map((apprentissage) => {
                const etablissement = apprentissage.etablissement;
                const etat = getState(etablissement);
                const codePostal = getCodePostal(etablissement);
                const localite = getCity(etablissement);
                const siret = getSiret(etablissement);

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
                      {getEstablishmentSignedCount(apprentissage)}
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
  entreprise: PropTypes.shape({
    siren: PropTypes.string,
  }),
};

export default renderIfSiren(Apprentissage);
