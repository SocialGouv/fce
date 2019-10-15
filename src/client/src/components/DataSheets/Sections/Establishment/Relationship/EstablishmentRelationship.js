import React from "react";
import PropTypes from "prop-types";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import LinkButton from "../../../../shared/LinkButton";
import Value from "../../../../shared/Value";
import Config from "../../../../../services/Config";
import _get from "lodash.get";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUsers, faSearch } from "@fortawesome/fontawesome-pro-solid";

const EstablishmentRelationship = ({ establishment }) => {
  const { code_idcc, libelle_idcc } = establishment;
  const nbAccords = _get(establishment, "accords.total.count");
  const raisonSociale =
    (establishment.nom_commercial &&
      establishment.nom_commercial.toLowerCase()) ||
    `${(establishment.nom && establishment.nom.toLowerCase()) ||
      ""} ${establishment.prenom.toLowerCase() || ""}`.trim() ||
    null;

  return (
    <section id="relation" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Relation travail</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Convention collective">
          <div>
            <Value value={code_idcc && code_idcc} />
            <span>{code_idcc && " - "}</span>
            <Value value={libelle_idcc && libelle_idcc} empty="" />
          </div>
        </Subcategory>
        <Subcategory subtitle="Accords d'entreprise">
          <Data
            name="Nombre total d'accords d'entreprise déposés depuis 1980"
            value={nbAccords}
            emptyValue="aucun accord connu"
            columnClasses={["is-8", "is-4"]}
          />
          {nbAccords > 0 && (
            <>
              <Data
                name="Date de signature du dernier accord d'entreprise déposé"
                value={_get(establishment, "accords.total.lastDate")}
                emptyValue="aucun accord connu"
                columnClasses={["is-8", "is-4"]}
              />
              <table className="table is-hoverable">
                <thead>
                  <tr>
                    <th>Thématique</th>
                    <th className="has-text-centered">
                      Nombre accords concernés
                    </th>
                    <th className="has-text-centered">
                      Date de signature du dernier accord
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Config.get("accords").map(({ key, value }) => (
                    <tr key={`accord-${key}`}>
                      <td className="w-40">{value}</td>
                      <td className="has-text-centered">
                        <Value
                          value={_get(establishment, `accords.${key}.count`)}
                          empty="-"
                          nonEmptyValues={[0, "0"]}
                        />
                      </td>
                      <td className="has-text-centered">
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
                  <LinkButton
                    value="Lancer la recherche"
                    isTargetBlank
                    icon={faSearch}
                    link={{
                      pathname:
                        Config.get("legifranceSearchUrl") + raisonSociale
                    }}
                  />
                }
                columnClasses={["is-8", "is-4"]}
              />
            </>
          )}
        </Subcategory>
      </div>
    </section>
  );
};

EstablishmentRelationship.propTypes = {
  establishment: PropTypes.object.isRequired
};

export default EstablishmentRelationship;
