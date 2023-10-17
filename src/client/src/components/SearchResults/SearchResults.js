import "./searchResults.scss";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import { isActiveEstablishment } from "../../helpers/Search";
import { formatSiret, joinNoFalsy } from "../../helpers/utils";
import Config from "../../services/Config";
import SearchAwesomeTable from "../SearchAwesomeTable";
import TableCellState from "../SearchAwesomeTable/TableCellState";
import Download from "../shared/Icons/Download.jsx";
import Value from "../shared/Value";

const formatNameData = ({
  denominationUniteLegale,
  denominationUsuelleUniteLegale,
  enseigneEtablissement,
  prenomUniteLegale,
  nomUniteLegale,
}) => {
  const personneUniteLegale = [prenomUniteLegale, nomUniteLegale]
    .join(" ")
    .trim();
  const data = [
    denominationUniteLegale,
    denominationUsuelleUniteLegale,
    enseigneEtablissement,
    personneUniteLegale,
  ].filter((value) => !!value);

  const additionalNameData = data.slice(1);

  const additionalNameDataString =
    additionalNameData.length > 0 ? `(${additionalNameData.join(" - ")})` : "";

  return [data[0], additionalNameDataString].join(" ");
};

const SearchResults = ({
  results,
  pagination,
  isLoading,
  sort,
  query,
  sortField,
  sortDirection,
  generateXlsx,
  downloadLoading,
}) => {
  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };

  return (
    <div className="app-search-results container is-fluid">
      {pagination.items > 0 && (
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <h2 className="app-search-results__title">
              {pagination.items} résultat
              {pagination.items > 1 && "s"}{" "}
              {query && (
                <>
                  <span className="app-search-results__title2">pour :</span>
                  {` “${query}”`}
                </>
              )}
            </h2>
          </div>
          <div className="column is-2 app-search-results__export-section">
            <button
              className={"app-search-results__export-button"}
              onClick={() => generateXlsx(pagination)}
            >
              <span>
                {downloadLoading ? (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    {...{ spin: downloadLoading }}
                  />
                ) : (
                  <Download />
                )}
              </span>
              {downloadLoading ? "En cours" : "Exporter"}
            </button>
          </div>
        </div>
      )}

      <div className="result-row">
        {results?.length === 0 && (
          <div className="notification is-primary is-light">Aucun résultat</div>
        )}
        {results?.length > 0 ? (
          <div>
            <SearchAwesomeTable
              showPagination={pagination && pagination.pages > 1}
              pagination={{ ...pagination, min: 1 }}
              prevText="Précédent"
              nextText="Suivant"
              isLoading={isLoading}
              isSortable={false}
              sortColumn={sort}
              sortField={sortField}
              sortDirection={sortDirection}
              data={results}
              fields={[
                {
                  accessor: (fields) => {
                    const siret = fields.siret;
                    return Value({
                      link: `/establishment/${siret}`,
                      value: formatSiret(siret),
                    });
                  },
                  headName: "SIRET",
                  importantHead: true,
                  link: ({ siret }) => `/establishment/${siret}`,
                  sortKey: "siret",
                },
                {
                  accessor: ({ etatAdministratifEtablissement, siret }) => {
                    return TableCellState({
                      etat: etatAdministratifEtablissement,
                      siret,
                    });
                  },
                  headName: "État",
                  sortKey: "etatadministratifetablissement",
                },
                {
                  accessor: (etablissement) => {
                    return Value({
                      value: formatNameData(etablissement),
                    });
                  },
                  headName: "Raison sociale / Nom",
                  html: true,
                  sortKey: "enterprise_name",
                },
                {
                  accessor: ({ etablissementSiege }) => {
                    return Value({
                      value: etablissementSiege
                        ? "Siège social"
                        : "Étab. secondaire",
                    });
                  },
                  headName: "Catégorie établissement",
                  sortKey: "etablissementsiege",
                },
                {
                  accessor: ({
                    codePostalEtablissement,
                    libelleCommuneEtablissement,
                  }) => {
                    return Value({
                      value: joinNoFalsy(
                        [codePostalEtablissement, libelleCommuneEtablissement],
                        " - "
                      ),
                    });
                  },
                  headName: "Code postal",
                  sortKey: "codepostaletablissement",
                },
                {
                  accessor: ({
                    trancheEffectifsEtablissement,
                    etatAdministratifEtablissement,
                  }) => {
                    return Value({
                      value:
                        trancheEffectifsEtablissement !== "-" &&
                        trancheEffectifsEtablissement !== "NN" &&
                        trancheEffectifsEtablissement !== "SP"
                          ? isActiveEstablishment(
                              etatAdministratifEtablissement
                            )
                            ? staffSizeRanges[trancheEffectifsEtablissement]
                            : "0 salarié"
                          : staffSizeRanges[trancheEffectifsEtablissement],
                    });
                  },
                  headName: "Effectif (DSN)",
                  sortKey: "lastdsntrancheeffectifsetablissement",
                },
                {
                  accessor: ({
                    codeActivitePrincipale,
                    libelleActivitePrincipale,
                  }) => {
                    return (
                      codeActivitePrincipale &&
                      Value({
                        value: `${codeActivitePrincipale || ""} - ${
                          libelleActivitePrincipale || ""
                        }`,
                      })
                    );
                  },
                  headName: "Activité",
                  sortKey: "activiteprincipaleetablissement",
                },
              ]}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  downloadLoading: PropTypes.bool.isRequired,
  generateXlsx: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  query: PropTypes.string,
  results: PropTypes.array,
  sort: PropTypes.func.isRequired,
  sortDirection: PropTypes.string,
  sortField: PropTypes.string,
};

export default withRouter(SearchResults);
