import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _get from "lodash.get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faExternalLink } from "@fortawesome/pro-solid-svg-icons";
import Data from "../../SharedComponents/Data";
import Table from "../../SharedComponents/Table";
import Subcategory from "../../SharedComponents/Subcategory";
import Value from "../../../../shared/Value";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import { formatEstablishmentAgreements } from "../../../../../helpers/Relationships";
import Config from "../../../../../services/Config";
import Psi from "./Psi";

const EstablishmentRelationship = ({
  enterprise,
  establishment: { idcc, siret },
  agreements
}) => {
  const establishmentAgreements = formatEstablishmentAgreements(
    agreements,
    siret
  );

  const raisonSociale = getEnterpriseName(enterprise);
  const nbAccords = establishmentAgreements.count;
  const lastDate = establishmentAgreements.lastSignatureDate;

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
                value={lastDate}
                emptyValue="-"
                columnClasses={["is-7", "is-5"]}
              />
              {lastDate && (
                <Table>
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
                            value={_get(
                              establishmentAgreements.agreements,
                              `${key}.count`
                            )}
                            empty="-"
                            nonEmptyValues={[0, "0"]}
                            hasNumberFormat
                          />
                        </td>
                        <td>
                          <Value
                            value={_get(
                              establishmentAgreements.agreements,
                              `${key}.lastDate`
                            )}
                            empty="-"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

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

        <Psi siret={siret} />
      </div>
    </section>
  );
};

EstablishmentRelationship.propTypes = {
  establishment: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired,
  agreements: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    agreements: state.agreements
  };
};

export default connect(mapStateToProps, null)(EstablishmentRelationship);
