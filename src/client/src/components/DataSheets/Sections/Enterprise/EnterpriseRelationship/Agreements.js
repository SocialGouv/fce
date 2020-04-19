import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faExternalLink,
  faEye
} from "@fortawesome/pro-solid-svg-icons";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import { sortAgreements } from "../../../../../helpers/Relationships";
import { getEnterpriseName } from "../../../../../helpers/Enterprise";
import { toI18nDate } from "../../../../../helpers/Date";
import Config from "../../../../../services/Config";

import "./agreements.scss";

export const Agreements = ({
  enterprise,
  enterprise: { accords, etablissements }
}) => {
  const nbAccords =
    accords &&
    Object.values(accords).reduce(
      (total, { count: totalEtab }) => total + totalEtab,
      0
    );

  const raisonSociale = getEnterpriseName(enterprise);

  const sortedAgreements = accords && sortAgreements(accords, etablissements);

  return (
    <Subcategory subtitle="Accords d'entreprise" sourceSi="D@cccord">
      <Data
        name="Nb total d'accords déposés par les différents établissements de l'entreprise"
        value={nbAccords}
        emptyValue="aucun accord connu"
        columnClasses={["is-9", "is-3"]}
      />
      {nbAccords > 0 && (
        <>
          <table className="table is-hoverable enterprise-agreements">
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th table__center-cell">État</th>
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
              {sortedAgreements.map(
                ({ siret, categorie, etat, date, totalEtab }) => {
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
                      <td className="has-text-right">{totalEtab}</td>
                      <td>{toI18nDate(date)}</td>
                      <td className="has-text-centered">
                        <Link to={`/establishment/${siret}/#relation`}>
                          <FontAwesomeIcon icon={faEye} className="mr-2" />
                          <span>Voir le détail</span>
                        </Link>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>

          <a
            href={
              Config.get("legifranceSearchUrl") + raisonSociale.toLowerCase()
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
  );
};

Agreements.propTypes = {
  enterprise: PropTypes.object.isRequired
};
