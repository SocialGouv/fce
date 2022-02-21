import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";
import State from "../../SharedComponents/State";
import Table from "../../SharedComponents/Table";
import { formatEnterpriseAgreements } from "../../../../../helpers/Relationships";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import { toI18nDate } from "../../../../../helpers/Date";
import { formatNumber, formatSiret } from "../../../../../helpers/utils";
import Config from "../../../../../services/Config";

import "./agreements.scss";

const Agreements = ({ enterprise, agreements }) => {
  const nbAccords = agreements.totalCount;
  const raisonSociale = getEnterpriseName(enterprise);
  const formatedAgreements = formatEnterpriseAgreements(agreements);

  return (
    <div>
      <Subcategory subtitle="Accords d'entreprise" sourceSi="D@cccord">
        <Data
          name="Nb total d'accords déposés par les différents établissements de l'entreprise"
          value={nbAccords}
          emptyValue="aucun accord connu"
          columnClasses={["is-9", "is-3"]}
        />
        {nbAccords > 0 && (
          <>
            <Table className="enterprise-agreements">
              <thead>
                <tr>
                  <th className="th">SIRET</th>
                  <th className="th table-cell--center-cell">État</th>
                  <th className="th">Catégorie établissement</th>
                  <th className="th enterprise-agreements__count">
                    Nb accords déposés
                  </th>
                  <th className="th enterprise-agreements__last">
                    Date signature du dernier
                  </th>
                  <th className="th see-details"></th>
                </tr>
              </thead>
              <tbody>
                {formatedAgreements.map(
                  ({ siret, category, state, count, lastSignatureDate }) => {
                    return (
                      <tr key={siret}>
                        <td className="table-cell--nowrap">
                          {formatSiret(siret)}
                        </td>
                        <td className="table-cell--center-cell">
                          {state && <State state={state} />}
                        </td>
                        <td>{category}</td>
                        <td className="has-text-right">
                          {count && formatNumber(count)}
                        </td>
                        <td>{toI18nDate(lastSignatureDate)}</td>
                        <td className="see-details">
                          <SeeDetailsLink
                            link={`/establishment/${siret}/#relation`}
                          />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>

            <a
              href={
                Config.get("legifranceSearchUrl.accords") +
                raisonSociale.toLowerCase()
              }
              target="_blank"
              rel="noreferrer noopener"
            >
              Rechercher ces accords sur Legifrance{" "}
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            </a>
          </>
        )}
      </Subcategory>
    </div>
  );
};

Agreements.propTypes = {
  enterprise: PropTypes.object.isRequired,
  agreements: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    agreements: state.agreements
  };
};

export default connect(mapStateToProps, null)(Agreements);
