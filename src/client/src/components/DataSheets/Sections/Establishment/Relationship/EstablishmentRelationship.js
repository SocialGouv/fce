import React from "react";
import Prototype from "prop-types";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";
import _get from "lodash.get";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-pro-solid";

const EstablishmentRelationship = ({ establishment }) => {
  const { code_idcc, libelle_idcc, accords } = establishment;
  const nbAccords = _get(establishment, "accords.total.count");

  return (
    <section id="relation" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Relation travail</h2>
      </div>
      <div className="section-datas">
        <Data
          name="Convention collective (IDCC)"
          value={`${code_idcc ? code_idcc : ""} - ${
            libelle_idcc ? libelle_idcc : ""
          }`}
        />
        <Data
          name="Nombre total d'accords d'entreprise déposés depuis 1980"
          value={nbAccords}
          emptyValue="aucun accord connu"
        />
        {nbAccords > 0 && (
          <>
            <Data
              name="Date de signature du dernier accord d'entreprise déposé"
              value={_get(establishment, "accords.total.lastDate")}
              emptyValue="aucun accord connu"
            />
            <table className="table is-hoverable">
              <thead>
                <tr>
                  <th className="th">Thématique</th>
                  <th className="th">Nombre accords concernés</th>
                  <th className="th">Date de signature du dernier accord</th>
                </tr>
              </thead>
              <tbody>
                {Config.get("accords").map(({ key, value }) => (
                  <tr key={`accord-${key}`}>
                    <td>{value}</td>
                    <td>
                      <Value
                        value={_get(establishment, `accords.${key}.count`)}
                        empty="-"
                        nonEmptyValues={[0, "0"]}
                      />
                    </td>
                    <td>
                      <Value
                        value={_get(establishment, `accords.${key}.lastDate`)}
                        empty="-"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Data
              name="Rechercher l'accord sur legifrance"
              value={
                <a
                  href={`https://www.legifrance.gouv.fr/initRechAccordsEntreprise.do?champRaisonSociale=${(establishment.nom_commercial &&
                    establishment.nom_commercial.toLowerCase()) ||
                    `${(establishment.nom && establishment.nom.toLowerCase()) ||
                      ""} ${establishment.prenom.toLowerCase() || ""}`.trim() ||
                    null}`}
                >
                  Lancer la recherche
                </a>
              }
            />
          </>
        )}
      </div>
    </section>
  );
};

EstablishmentRelationship.Prototype = {
  establishment: Prototype.object.isRequired
};

export default EstablishmentRelationship;
