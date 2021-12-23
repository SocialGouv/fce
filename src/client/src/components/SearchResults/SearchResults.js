import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Config from "../../services/Config";
import { isActiveEstablishment } from "../../helpers/Search";
import { formatSiret, joinNoFalsy } from "../../helpers/utils";
import Value from "../shared/Value";
import SearchAwesomeTable from "../SearchAwesomeTable";
import TableCellState from "../SearchAwesomeTable/TableCellState";
import Button from "../shared/Button";
import { faFileExcel, faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";

import "./searchResults.scss";

const SearchResults = ({
  results,
  pagination,
  isLoading,
  sort,
  sortField,
  sortDirection,
  generateXlsx,
  downloadLoading,
}) => {
  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié",
  };

  console.log(results);

  return (
    <div className="app-search-results container is-fullhd">
      {pagination.items > 0 && (
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <h2 className="app-search-results__title">
              {pagination.items} établissement
              {pagination.items > 1 && "s"} trouvé
              {pagination.items > 1 && "s"}
            </h2>
          </div>
          <div className="column is-2 app-search-results__export-section">
            <Button
              value={downloadLoading ? "Export en cours" : "Export Excel"}
              buttonClasses={["app-search-results__export-button"]}
              icon={downloadLoading ? faSpinnerThird : faFileExcel}
              faProps={{ spin: downloadLoading }}
              callback={() => generateXlsx(pagination)}
            />
          </div>
        </div>
      )}

      <div className="result-row">
        {results.length === 0 && (
          <div className="notification is-primary is-light">Aucun résultat</div>
        )}
        {!!results.length ? (
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
                  headName: "SIRET",
                  sortKey: "siret",
                  importantHead: true,
                  accessor: (fields) => {
                    let siret = fields.siret;
                    return Value({
                      value: formatSiret(siret),
                      link: `/establishment/${siret}`,
                    });
                  },
                  link: ({ siret }) => `/establishment/${siret}`,
                },
                {
                  headName: "État",
                  sortKey: "etatadministratifetablissement",
                  accessor: ({ etatAdministratifEtablissement, siret }) => {
                    return TableCellState({
                      siret,
                      etat: etatAdministratifEtablissement,
                    });
                  },
                },
                {
                  headName: "Raison sociale / Nom",
                  sortKey: "enterprise_name",
                  html: true,
                  accessor: ({
                    denominationUniteLegale,
                    denominationUsuelleUniteLegale,
                    prenomUniteLegale,
                    nomUniteLegale,
                    enseigneEtablissement,
                  }) => {
                    let name =
                      (denominationUniteLegale ||
                        denominationUsuelleUniteLegale ||
                        `${nomUniteLegale} ${prenomUniteLegale}`.trim()) +
                      (enseigneEtablissement
                        ? ` (Enseigne : ${enseigneEtablissement})`
                        : "");

                    return Value({
                      value: name,
                    });
                  },
                },
                {
                  headName: "Catégorie établissement",
                  sortKey: "etablissementsiege",
                  accessor: ({ etablissementSiege }) => {
                    return Value({
                      value: etablissementSiege
                        ? "Siège social"
                        : "Étab. secondaire",
                    });
                  },
                },
                {
                  headName: "Code postal",
                  sortKey: "codepostaletablissement",
                  accessor: ({
                    codesPostalEtablissement,
                    libelleCommuneEtablissement,
                  }) => {
                    return Value({
                      value: joinNoFalsy(
                        [codesPostalEtablissement, libelleCommuneEtablissement],
                        " - "
                      ),
                    });
                  },
                },
                {
                  headName: "Effectif (DSN)",
                  sortKey: "lastdsntrancheeffectifsetablissement",
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
                },
                {
                  headName: "Activité",
                  sortKey: "activiteprincipaleetablissement",
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
  results: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sort: PropTypes.func.isRequired,
  sortField: PropTypes.string,
  sortDirection: PropTypes.string,
  generateXlsx: PropTypes.func.isRequired,
  downloadLoading: PropTypes.bool.isRequired,
};

export default withRouter(SearchResults);
