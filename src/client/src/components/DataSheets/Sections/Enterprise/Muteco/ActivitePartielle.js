import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import _get from "lodash.get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEye } from "@fortawesome/pro-solid-svg-icons";

import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";

const ActivitePartielle = ({
  enterprise: { activite_partielle, etablissements }
}) => {
  const hasActivitePartielle = !!activite_partielle;

  const totalActivitePartielle =
    hasActivitePartielle &&
    activite_partielle.length > 1 &&
    activite_partielle.reduce(
      (totals, { nbHeuresAutorisees, nbHeuresConsommees }) => {
        totals.nbHeuresAutorisees += parseFloat(nbHeuresAutorisees);
        totals.nbHeuresConsommees += parseFloat(nbHeuresConsommees);
        return {
          nbHeuresAutorisees: totals.nbHeuresAutorisees,
          nbHeuresConsommees: totals.nbHeuresConsommees
        };
      },
      { nbHeuresAutorisees: 0, nbHeuresConsommees: 0 }
    );

  return (
    <Subcategory subtitle="Activité partielle" sourceSi="APART">
      <Data
        name="Nb d'établissements ayant eu recours à l'activité partielle au cours des 24 derniers mois"
        value={hasActivitePartielle && activite_partielle.length}
        emptyValue="0"
        columnClasses={["is-8", "is-4"]}
      />
      {hasActivitePartielle && (
        <>
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th table__center-cell">État</th>
                <th className="th">Catégorie établissement</th>
                <th className="th">Nb total d{"'"}heures autorisées</th>
                <th className="th">Nb total d{"'"}heures consommées</th>
                <th className="th">
                  Date de décision de la dernière convention
                </th>
                <th className="th see-details"></th>
              </tr>
            </thead>
            <tbody>
              {activite_partielle.map(
                ({ siret, nbHeuresAutorisees, nbHeuresConsommees, date }) => {
                  const establishment = etablissements.find(
                    etab => etab.siret.trim() === siret.trim()
                  );
                  const etat = _get(establishment, "etat_etablissement");
                  const categorie = _get(
                    establishment,
                    "categorie_etablissement"
                  );

                  return (
                    <tr key={siret}>
                      <td>{siret}</td>
                      <td className="table__center-cell">
                        {etat && (
                          <FontAwesomeIcon
                            className={
                              etat === Config.get("establishmentState").actif
                                ? "icon--success"
                                : "icon--danger"
                            }
                            icon={faCircle}
                          />
                        )}
                      </td>
                      <td>{categorie}</td>
                      <td className="has-text-right">
                        {Math.round(nbHeuresAutorisees)}
                      </td>
                      <td className="has-text-right">
                        {Math.round(nbHeuresConsommees)}
                      </td>
                      <td>{<Value value={date} />}</td>
                      <td className="has-text-centered">
                        <Link to={`/establishment/${siret}/#muteco`}>
                          <FontAwesomeIcon icon={faEye} className="mr-2" />
                          <span>Voir le détail</span>
                        </Link>
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
                    {Math.round(totalActivitePartielle.nbHeuresAutorisees)}
                  </td>
                  <td className="has-text-right">
                    {Math.round(totalActivitePartielle.nbHeuresConsommees)}
                  </td>
                  <td colSpan="2" />
                </tr>
              </tfoot>
            )}
          </table>
        </>
      )}
    </Subcategory>
  );
};

ActivitePartielle.propTypes = {
  enterprise: Proptypes.object.isRequired
};

export default ActivitePartielle;
