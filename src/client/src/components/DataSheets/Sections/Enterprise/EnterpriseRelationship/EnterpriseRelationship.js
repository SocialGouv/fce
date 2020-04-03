import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _get from "lodash.get";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCircle,
  faExternalLink
} from "@fortawesome/pro-solid-svg-icons";

import Subcategory from "../../SharedComponents/Subcategory";
import Data from "../../SharedComponents/Data";
import Config from "../../../../../services/Config";

const EnterpriseRelationship = ({
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

  const raisonSociale =
    raison_sociale ||
    sigle ||
    nom_commercial ||
    `${nom || ""} ${prenom || ""}`.trim() ||
    null;

  const conventionsCollectives = etablissements
    .filter(({ code_idcc }) => !!code_idcc)
    .map(({ code_idcc, libelle_idcc }) => `${code_idcc} - ${libelle_idcc}`);

  return (
    <section id="accords" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        <h2 className="title">Relation travail</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Convention(s) collective(s) appliquée(s)">
          <ul>
            {conventionsCollectives.map(convention => (
              <li key={convention}>{convention}</li>
            ))}
          </ul>
        </Subcategory>

        <Subcategory subtitle="Accords d'entreprise">
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
                      const date =
                        lastDate &&
                        lastDate
                          .split("-")
                          .reverse()
                          .join("/");

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
                                  etat ===
                                  Config.get("establishmentState").actif
                                    ? "icon--success"
                                    : "icon--danger"
                                }
                                icon={faCircle}
                              />
                            )}
                          </td>
                          <td>{totalEtab}</td>
                          <td>{date}</td>
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
      </div>
    </section>
  );
};

EnterpriseRelationship.propTypes = {
  enterprise: PropTypes.object.isRequired
};

export default EnterpriseRelationship;
