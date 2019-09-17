import React from "react";
import { Link } from "react-router-dom";
import Prototype from "prop-types";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";
import _get from "lodash.get";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUsers, faCircle } from "@fortawesome/fontawesome-pro-solid";

const Accords = ({ enterprise: { accords, etablissements } }) => {
  const nbAccords = Object.values(accords).reduce(
    (total, { count: totalEtab }) => total + totalEtab,
    0
  );

  return (
    <section id="accords" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Accords d'entreprise</h2>
      </div>
      <div className="section-datas">
        <Data
          name="Nb total d'accords déposés par les différents établissements de l'entreprise"
          value={nbAccords}
          emptyValue="aucun accord connu"
        />
        {nbAccords > 0 && (
          <>
            <table className="table is-hoverable">
              <thead>
                <tr>
                  <th className="th">SIRET</th>
                  <th className="th">Catégorie établissement</th>
                  <th className="th">État</th>
                  <th className="th">Nb accords déposés</th>
                  <th className="th">Date signature dernier accord</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(accords).map(
                  ([siret, { count: totalEtab, lastDate }]) => {
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
                        <td>
                          {etat && (
                            <FontAwesomeIcon
                              className={
                                etat === "A" ? "icon--success" : "icon--danger"
                              }
                              icon={faCircle}
                            />
                          )}
                        </td>
                        <td>{totalEtab}</td>
                        <td>{lastDate}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

Accords.Prototype = {
  enterprise: Prototype.object.isRequired
};

export default Accords;
