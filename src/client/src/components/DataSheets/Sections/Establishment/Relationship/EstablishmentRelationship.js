import React from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faExternalLink } from "@fortawesome/pro-solid-svg-icons";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Value from "../../../../shared/Value";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import Config from "../../../../../services/Config";

const EstablishmentRelationship = ({
  enterprise,
  establishment: { idcc, accords }
}) => {
  const nbAccords = _get(accords, "total.count");
  const raisonSociale = getEnterpriseName(enterprise);

  return (
    <section id="relation" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Relation travail</h2>
      </div>
      <div className="section-datas">
        <Subcategory
          subtitle="Convention(s) collective(s) appliquée(s)"
          sourceSi="DSN"
        >
          <div className="section-datas__list">
            <ul>
              {idcc
                ? idcc.map(({ code, libelle }) => (
                    <li className="section-datas__list-item" key={code}>
                      <Value value={`${code} - ${libelle}`} />
                    </li>
                  ))
                : "-"}
            </ul>
          </div>
        </Subcategory>
        <Subcategory subtitle="Accords d'entreprise" sourceSi="D@cccord">
          <Data
            name="Nombre total d'accords d'entreprise déposés depuis 1980"
            value={nbAccords}
            emptyValue="aucun accord connu"
            columnClasses={["is-7", "is-5"]}
            hasNumberFormat
          />
          {nbAccords > 0 && (
            <>
              <Data
                name="Date de signature du dernier accord d'entreprise déposé"
                value={_get(accords, "total.lastDate")}
                emptyValue="aucun accord connu"
                columnClasses={["is-7", "is-5"]}
              />
              <table className="table is-hoverable">
                <thead>
                  <tr>
                    <th>Thématique</th>
                    <th className="has-text-right">Nombre d{"'"}accords</th>
                    <th>Date de signature du dernier accord</th>
                  </tr>
                </thead>
                <tbody>
                  {Config.get("accords").map(({ key, value }) => (
                    <tr key={`accord-${key}`}>
                      <td className="col-width-40">{value}</td>
                      <td className="has-text-right">
                        <Value
                          value={_get(accords, `${key}.count`)}
                          empty="-"
                          nonEmptyValues={[0, "0"]}
                          hasNumberFormat
                        />
                      </td>
                      <td>
                        <Value
                          value={_get(accords, `${key}.lastDate`)}
                          empty="-"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <a
                href={
                  Config.get("legifranceSearchUrl") +
                  raisonSociale.toLowerCase()
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                Rechercher ces accords sur Legifrance{" "}
                <FontAwesomeIcon icon={faExternalLink} />
              </a>
            </>
          )}
        </Subcategory>
      </div>
    </section>
  );
};

EstablishmentRelationship.propTypes = {
  establishment: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired
};

export default EstablishmentRelationship;
