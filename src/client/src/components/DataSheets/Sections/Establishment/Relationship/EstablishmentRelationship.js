import {
  faExternalLinkSquareAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import Config from "../../../../../services/Config";
import {
  getGroupedAccordsLastSigning,
  getGroupedAccordsSum,
  groupAccordsByType,
} from "../../../../../utils/accords/accords";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent";
import Value from "../../../../shared/Value";
import Data from "../../SharedComponents/Data";
import Subcategory from "../../SharedComponents/Subcategory";
import Table from "../../SharedComponents/Table";
import ConventionsCollectives from "./ConventionsCollectives";
import { useAccordsEntreprise } from "./EstablishmentRelationship.gql";
import Psi from "./Psi";
import WorkAccident from "./WorkAccident";

const EstablishmentRelationship = ({ siret }) => {
  const { loading, data, error } = useAccordsEntreprise(siret);

  const accords = groupAccordsByType(data || []);
  const nbAccords = getGroupedAccordsSum(accords);
  const lastDate = getGroupedAccordsLastSigning(accords);

  return (
    <section id="relation" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Relation travail</h2>
      </div>
      <div className="section-datas">
        <ConventionsCollectives siret={siret} />
        <Subcategory subtitle="Accords d'entreprise" sourceSi="D@cccord">
          <LoadableContent loading={loading} error={error}>
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
                              value={get(accords, `${key}.count`)}
                              empty="-"
                              nonEmptyValues={[0, "0"]}
                              hasNumberFormat
                            />
                          </td>
                          <td>
                            <Value
                              value={get(accords, `${key}.lastSignDate`)}
                              empty="-"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}

                <a
                  href={Config.get("legifranceSearchUrl.accords") + siret}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Rechercher ces accords sur Legifrance{" "}
                  <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                </a>
              </>
            )}
          </LoadableContent>
        </Subcategory>

        <Psi siret={siret} />
        <WorkAccident siret={siret} />
      </div>
    </section>
  );
};

EstablishmentRelationship.propTypes = {
  agreements: PropTypes.object.isRequired,
  siret: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agreements: state.agreements,
  };
};

export default connect(mapStateToProps, null)(EstablishmentRelationship);
