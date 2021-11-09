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
  currentSort,
  generateXlsx,
  downloadXlsxStatus
}) => {
  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

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
              value={
                downloadXlsxStatus.isLoading
                  ? "Export en cours"
                  : "Export Excel"
              }
              buttonClasses={["app-search-results__export-button"]}
              icon={downloadXlsxStatus.isLoading ? faSpinnerThird : faFileExcel}
              faProps={{ spin: downloadXlsxStatus.isLoading }}
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
              isSortable={true}
              sortColumn={sort}
              currentSort={currentSort}
              data={results}
              fields={[
                {
                  headName: "SIRET",
                  sortKey: "siret",
                  importantHead: true,
                  accessor: fields => {
                    let siret = fields?.siret;
                    return <Value value={formatSiret(siret)} link={`/establishment/${siret}`} />
                  },
                  link: ({ siret }) => `/establishment/${siret}`
                },
                {
                  headName: "État",
                  sortKey: "etatadministratifetablissement",
                  accessor: fields => {
                    let siret = fields?.siret;
                    let etat = fields?.etatadministratifetablissement;
                    return TableCellState({ siret, etat });
                  }
                },
                {
                  headName: "Raison sociale / Nom",
                  sortKey: "enterprise_name",
                  html: true,
                  accessor: fields => {
                    let enterpriseName = fields?.enterprise_name;
                    let enseigne = fields?.enseigne1etablissement;

                    let name = `<div>${enterpriseName}</div>`;

                    if (enseigne) {
                      name += `<div>(Enseigne : ${enseigne})</div>`;
                    }

                    return Value({
                      value: name
                    });
                  }
                },
                {
                  headName: "Catégorie établissement",
                  sortKey: "etablissementsiege",
                  accessor: fields => {
                    const isSiege = fields?.etablissementsiege === "true";
                    return Value({
                      value: isSiege ? "Siège social" : "Étab. secondaire"
                    });
                  }
                },
                {
                  headName: "Code postal",
                  sortKey: "codepostaletablissement",
                  accessor: fields => {
                    let postalCode = fields?.codepostaletablissement;
                    let town = fields?.libellecommuneetablissement;
                    return Value({
                      value: joinNoFalsy([postalCode, town], " - ")
                    });
                  }
                },
                {
                  headName: "Effectif (DSN)",
                  sortKey: "lastdsntrancheeffectifsetablissement",
                  accessor: fields => {
                    let trancheEffectif =
                      fields?.lastdsntrancheeffectifsetablissement;
                    let etat = fields?.etatadministratifetablissement;

                    return Value({
                      value:
                        trancheEffectif !== "-" &&
                          trancheEffectif !== "NN" &&
                          trancheEffectif !== "SP"
                          ? isActiveEstablishment(etat)
                            ? staffSizeRanges[trancheEffectif]
                            : "0 salarié"
                          : staffSizeRanges[trancheEffectif]
                    });
                  }
                },
                {
                  headName: "Activité",
                  sortKey: "activiteprincipaleetablissement",
                  accessor: fields => {
                    let naf = fields?.activiteprincipaleetablissement;
                    let libelle_naf =
                      fields?.activiteprincipaleetablissement_libelle;

                    return (
                      naf &&
                      Value({
                        value: `${naf === undefined ? "" : naf} ${libelle_naf === undefined ? "" : " - " + libelle_naf
                          }`
                      })
                    );
                  }
                }
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
  currentSort: PropTypes.object.isRequired,
  generateXlsx: PropTypes.func.isRequired,
  downloadXlsxStatus: PropTypes.object.isRequired
};

export default withRouter(SearchResults);
