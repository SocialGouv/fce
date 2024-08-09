import PropTypes from "prop-types";
import React from "react";

import { useRenderIfSiren } from "../../../../../helpers/hoc/renderIfSiren.js";
import { formatNumber, formatSiret } from "../../../../../helpers/utils";
import {
  formatActivitePartielle,
  getTotalValues,
} from "../../../../../utils/activite-partielle/activite-partielle";
import {
  getCategoryLabel,
  getState,
  isActive,
} from "../../../../../utils/establishment/establishment";
import BadgeWithIcon from "../../../../shared/Badge/BadgeWithIcon.jsx";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import Subcategory from "../../SharedComponents/Subcategory";
import { useActivitePartielle } from "./ActivitePartielle.gql";

const ActivitePartielle = ({ enterprise }) => {
  const { siren } = enterprise;
  const { data, loading, error } = useActivitePartielle(siren);
  const shouldNotRender = useRenderIfSiren({
    entreprise: enterprise,
    siren,
  });

  if (loading || error || shouldNotRender) {
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
        columnClasses={["is-10", "is-2"]}
        className="has-no-border"
      />
      {hasActivitePartielle && (
        <div className="data-sheet--table">
          <NonBorderedTable
            isScrollable={formattedActivitePartielle.length > 6}
          >
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
                  const etab = etablissement;
                  const isEtablissementActive = isActive(etab);
                  const stateClass = isEtablissementActive
                    ? "icon--success"
                    : "icon--danger";
                  const stateText = isEtablissementActive ? "ouvert" : "fermé";

                  return (
                    <tr key={siret}>
                      <td className="table-cell--nowrap">
                        <SeeDetailsLink
                          link={`/establishment/${siret}/#muteco`}
                          text={formatSiret(siret)}
                        />
                      </td>
                      <td className="table-cell--center-cell">
                        {etat && (
                          <BadgeWithIcon
                            isTableBadge
                            text={stateText}
                            state={stateClass}
                          />
                        )}
                      </td>
                      <td>{categorie}</td>
                      <td>{formatNumber(Math.round(nb_h_auto_cum))}</td>
                      <td>{formatNumber(Math.round(nb_h_conso_cum))}</td>
                      <td>{<Value value={date_decision} />}</td>
                    </tr>
                  );
                }
              )}
            </tbody>

            {totalActivitePartielle && (
              <tfoot>
                <tr>
                  <th> </th>
                  <th> </th>
                  <th className="tfoot-recour">Totaux</th>
                  <td>
                    {formatNumber(
                      Math.round(totalActivitePartielle.nb_h_auto_cum)
                    )}
                  </td>
                  <td>
                    {formatNumber(
                      Math.round(totalActivitePartielle.nb_h_conso_cum)
                    )}
                  </td>
                  <td colSpan="2" />
                </tr>
              </tfoot>
            )}
          </NonBorderedTable>
        </div>
      )}
    </Subcategory>
  );
};

ActivitePartielle.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default ActivitePartielle;
