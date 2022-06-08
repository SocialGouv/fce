import "./searchResults.scss";

import { faFileExcel, faSpinner } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import { isActiveEstablishment } from "../../helpers/Search";
import { formatSiret, joinNoFalsy } from "../../helpers/utils";
import Config from "../../services/Config";
import SearchAwesomeTable from "../SearchAwesomeTable";
import TableCellState from "../SearchAwesomeTable/TableCellState";
import Button from "../shared/Button";
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
              icon={downloadLoading ? faSpinner : faFileExcel}
              faProps={{ spin: downloadLoading }}
              callback={() => generateXlsx(pagination)}
            />
          </div>
        </div>
      )}

      <div className="result-row">
        {results?.length === 0 && (
          <div className="notification is-primary is-light">Aucun résultat</div>
        )}
        {results?.length ? (
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
  results: PropTypes.array,
  sort: PropTypes.func.isRequired,
  sortDirection: PropTypes.string,
  sortField: PropTypes.string,
};

export default withRouter(SearchResults);
