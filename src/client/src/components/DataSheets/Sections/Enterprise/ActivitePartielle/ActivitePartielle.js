import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";
import _get from "lodash.get";
import Value from "../../../../shared/Value";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUsers, faCircle } from "@fortawesome/fontawesome-pro-solid";

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
        return totals;
      },
      { nbHeuresAutorisees: 0, nbHeuresConsommees: 0 }
    );

  return (
    <section id="activite-partielle" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Mutations économiques</h2>
      </div>
      <div className="section-datas">
        <Data
          name="Nb d'établissements ayant eu recours à l'activité partielle au cours des 24 derniers mois"
          value={hasActivitePartielle && activite_partielle.length}
          emptyValue="0"
          columnClasses={["is-9", "is-3"]}
        />
        {hasActivitePartielle && (
          <>
            <table className="table is-hoverable">
              <thead>
                <tr>
                  <th className="th">SIRET</th>
                  <th className="th">Catégorie établissement</th>
                  <th className="th table__center-cell">État</th>
                  <th className="th">Nombre total d'heures autorisées</th>
                  <th className="th">Nombre total d'heures consommées</th>
                  <th className="th">
                    Date de décision de la dernière convention
                  </th>
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
                        <td>
                          <Link to={`/establishment/${siret}`}>{siret}</Link>
                        </td>
                        <td>{categorie}</td>
                        <td className="table__center-cell">
                          {etat && (
                            <FontAwesomeIcon
                              className={
                                etat === "A" ? "icon--success" : "icon--danger"
                              }
                              icon={faCircle}
                            />
                          )}
                        </td>
                        <td>{nbHeuresAutorisees}</td>
                        <td>{nbHeuresConsommees}</td>
                        <td>{<Value value={date} />}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>

              {totalActivitePartielle && (
                <tfoot>
                  <tr>
                    <th colSpan="3">Total : </th>
                    <td>{totalActivitePartielle.nbHeuresAutorisees}</td>
                    <td>{totalActivitePartielle.nbHeuresConsommees}</td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          </>
        )}
      </div>
    </section>
  );
};

ActivitePartielle.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default ActivitePartielle;
