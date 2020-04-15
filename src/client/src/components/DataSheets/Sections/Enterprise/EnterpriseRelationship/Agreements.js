import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faExternalLink } from "@fortawesome/pro-solid-svg-icons";
import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import {
  getCompanyName,
  sortAgreements
} from "../../../../../helpers/Relationships";
import { toI18nDate } from "../../../../../helpers/Date";
import Config from "../../../../../services/Config";

export const Agreements = ({
  enterprise: {
    accords,
    etablissements,
    raison_sociale,
    sigle,
    nom_commercial,
    nom,
    prenom
  }
}) => {
  const nbAccords =
    accords &&
    Object.values(accords).reduce(
      (total, { count: totalEtab }) => total + totalEtab,
      0
    );

  const raisonSociale = getCompanyName({
    raison_sociale,
    sigle,
    nom_commercial,
    nom,
    prenom
  });

  const sortedAgreements = sortAgreements(accords, etablissements);

  return (
    <Subcategory subtitle="Accords d'entreprise" source="D@cccord">
      <Data
        name="Nb total d'accords déposés par les différents établissements de l'entreprise"
        value={nbAccords}
        emptyValue="aucun accord connu"
        columnClasses={["is-9", "is-3"]}
      />
      {nbAccords > 0 && (
        <>
          <table className="table is-hoverable">
            <thead>
              <tr>
                <th className="th">SIRET</th>
                <th className="th">Catégorie établissement</th>
                <th className="th table__center-cell">État</th>
                <th className="th">Nb accords déposés</th>
                <th className="th">Date signature dernier accord</th>
              </tr>
            </thead>
            <tbody>
              {sortedAgreements.map(
                ({ siret, categorie, etat, date, totalEtab }) => {
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
                              etat === Config.get("establishmentState").actif
                                ? "icon--success"
                                : "icon--danger"
                            }
                            icon={faCircle}
                          />
                        )}
                      </td>
                      <td>{totalEtab}</td>
                      <td>{toI18nDate(date)}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>

          <a
            href={Config.get("legifranceSearchUrl") + raisonSociale}
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
