import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Config from "../../services/Config";
import { isActiveEstablishment } from "../../helpers/Search";
import { joinNoFalsy } from "../../helpers/utils";
import Value from "../shared/Value";
import GenerateXlxs from "./Xlsx/GenerateXlsx";
import SearchAwesomeTable from "../SearchAwesomeTable";
import TableCellState from "../SearchAwesomeTable/TableCellState";
import Button from "../shared/Button";
import { faFileExcel } from "@fortawesome/pro-solid-svg-icons";

import "./searchResults.scss";

const SearchResults = ({
  results,
  pagination,
  isLoading,
  sort,
  currentSort
}) => {
  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

  function generateXlxs() {
    if (results && results.length) {
      return new GenerateXlxs(pagination).download();
    }
  }

  return (
    <div className="app-search-results">
      {pagination.items > 0 && (
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <h2 className="app-search-results__title">
              {pagination.items} établissement
              {pagination.items > 1 && "s"} trouvé
              {pagination.items > 1 && "s"}
            </h2>
          </div>
          <div className="column is-2 export-button">
            <Button
              value="Export Excel"
              buttonClasses={["is-grey"]}
              icon={faFileExcel}
              callback={generateXlxs}
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
                  accessor: ({ siret: { raw: siret } }) =>
                    Value({
                      value: siret,
                      link: `/establishment/${siret}`
                    }),
                  link: ({ siret: { raw: siret } }) => `/establishment/${siret}`
                },
                {
                  headName: "État",
                  sortKey: "etatadministratifetablissement",
                  accessor: ({
                    siret: { raw: siret },
                    etatadministratifetablissement: { raw: etat }
                  }) => TableCellState({ siret, etat })
                },
                {
                  headName: "Raison sociale / Nom",
                  sortKey: "enterprise_name",
                  html: true,
                  accessor: ({
                    enterprise_name: { raw: enterpriseName },
                    enseigne1etablissement: { raw: enseigne }
                  }) => {
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
                  accessor: ({ etablissementsiege }) => {
                    const isSiege = etablissementsiege.raw === "true";
                    return Value({
                      value: isSiege ? "Siège social" : "Établissement"
                    });
                  }
                },
                {
                  headName: "Code postal",
                  sortKey: "codepostaletablissement",
                  accessor: ({
                    codepostaletablissement: { raw: postalCode },
                    libellecommuneetablissement: { raw: town }
                  }) =>
                    Value({
                      value: joinNoFalsy([postalCode, town], " - ")
                    })
                },
                {
                  headName: "Effectif",
                  sortKey: "trancheeffectifsetablissement",
                  accessor: ({
                    trancheeffectifsetablissement: {
                      raw: trancheEffectifInsee
                    },
                    etatadministratifetablissement: { raw: etat }
                  }) =>
                    Value({
                      value: isActiveEstablishment(etat)
                        ? staffSizeRanges[trancheEffectifInsee]
                        : "0 salarié"
                    })
                },
                {
                  headName: "Activité",
                  sortKey: "activiteprincipaleetablissement",
                  accessor: ({
                    activiteprincipaleetablissement: { raw: naf },
                    activiteprincipaleetablissement_libelle: {
                      raw: libelle_naf
                    }
                  }) =>
                    naf &&
                    Value({
                      value: `${naf === null ? "" : naf} ${
                        libelle_naf === null ? "" : " - " + libelle_naf
                      }`
                    })
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
  currentSort: PropTypes.object.isRequired
};

export default withRouter(SearchResults);
