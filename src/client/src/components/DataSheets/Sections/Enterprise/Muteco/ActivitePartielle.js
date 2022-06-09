import PropTypes from "prop-types";
import React from "react";

import { hideIf } from "../../../../../helpers/hoc/hideIf";
import { formatNumber, formatSiret } from "../../../../../helpers/utils";
import {
  formatActivitePartielle,
  getTotalValues,
} from "../../../../../utils/activite-partielle/activite-partielle";
import {
  getCategoryLabel,
  getState,
} from "../../../../../utils/establishment/establishment";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import { useActivitePartielle } from "./ActivitePartielle.gql";

const ActivitePartielle = ({ enterprise: { siren } }) => {
  const { data, loading, error } = useActivitePartielle(siren);

  if (loading || error) {
    return null;
  }

  const activitePartielle = data.etablissements_activite_partielle;
  const hasActivitePartielle = activitePartielle.length > 0;

  const formattedActivitePartielle = formatActivitePartielle(activitePartielle);
  const totalActivitePartielle = getTotalValues(formattedActivitePartielle);
  return (
    <Subcategory subtitle="Activité partielle" sourceSi="APART">
      <Data
        name="Nb d'établissements ayant eu recours à l'activité partielle au cours des 24 derniers mois"
        value={activitePartielle.length}
        emptyValue="0"
        columnClasses={["is-8", "is-4"]}
      />
      {hasActivitePartielle && (
        <>
          <Table>
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th table-cell--center-cell">État</th>
                <th className="th">Catégorie établissement</th>
                <th className="th">Nb total d{"'"}heures autorisées</th>
                <th className="th">Nb total d{"'"}heures consommées</th>
                <th className="th">
                  Date de décision de la dernière convention
                </th>
                <th className="th see-details" />
              </tr>
            </thead>
            <tbody>
              {formattedActivitePartielle.map(
                ({
                  siret,
                  nb_h_auto_cum,
                  nb_h_conso_cum,
                  date_decision,
                  etablissement,
                }) => {
                  const etat = getState(etablissement);
                  const categorie = getCategoryLabel(etablissement);

                  return (
                    <tr key={siret}>
                      <td className="table-cell--nowrap">
                        {formatSiret(siret)}
                      </td>
                      <td className="table-cell--center-cell">
                        {etat && <State state={etat} />}
                      </td>
                      <td>{categorie}</td>
                      <td className="has-text-right">
                        {formatNumber(Math.round(nb_h_auto_cum))}
                      </td>
                      <td className="has-text-right">
                        {formatNumber(Math.round(nb_h_conso_cum))}
                      </td>
                      <td>{<Value value={date_decision} />}</td>
                      <td className="see-details">
                        <SeeDetailsLink
                          link={`/establishment/${siret}/#muteco`}
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>

            {totalActivitePartielle && (
              <tfoot>
                <tr>
                  <th className="has-text-right" colSpan="3">
                    Totaux
                  </th>
                  <td className="has-text-right">
                    {formatNumber(
                      Math.round(totalActivitePartielle.nb_h_auto_cum)
                    )}
                  </td>
                  <td className="has-text-right">
                    {formatNumber(
                      Math.round(totalActivitePartielle.nb_h_conso_cum)
                    )}
                  </td>
                  <td colSpan="2" />
                </tr>
              </tfoot>
            )}
          </Table>
        </>
      )}
    </Subcategory>
  );
};

ActivitePartielle.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default hideIf(({ enterprise }) => !enterprise?.siren)(
  ActivitePartielle
);
