import React from "react";
import { Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faCircle,
  faFileExcel
} from "@fortawesome/fontawesome-pro-solid";
import ReactTable from "react-table";
import Value from "../../elements/Value";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Config from "./../../services/Config";
import { isActiveEstablishment } from "../../helpers/Establishment";

class SearchResults extends React.Component {
  render() {
    const { results, pagination, downloadXlsxExport } = this.props;

    const staffSizeRanges = {
      ...Config.get("inseeSizeRanges"),
      "0 salarié": "0 salarié"
    };

    return (
      <div className="app-searchResults" style={{ marginTop: "3rem" }}>
        {results && results.length >= 1 && (
          <h2 className="title">
            {pagination.items} établissement{pagination.items > 1 && "s"} trouvé
            {pagination.items > 1 && "s"}
          </h2>
        )}

        <div className="columns">
          <div className="column is-12">
            <button
              className="button is-dark is-outlined is-pulled-right"
              onClick={e => downloadXlsxExport(pagination.page)}
            >
              <span className="icon">
                <FontAwesomeIcon icon={faFileExcel} />
              </span>
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        <div className="columns result-row">
          <div className="column is-12">
            {!Array.isArray(results) ? (
              <Alert color="danger">Une erreur est survenue.</Alert>
            ) : !results.length ? (
              <Alert color="info">Aucun résultat</Alert>
            ) : (
              ""
            )}

            {Array.isArray(results) && results.length ? (
              <ReactTable
                data={results}
                className="table is-striped is-hoverable"
                defaultPageSize={results.length}
                showPagination={
                  this.props.pagination && this.props.pagination.pages > 1
                }
                showPageSizeOptions={false}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                pages={this.props.pagination && this.props.pagination.pages}
                onFetchData={this.props.fetchData}
                loading={this.props.loading}
                sortable={false}
                getTrProps={(state, rowInfo) => {
                  return {
                    onClick: e => {
                      e && e.preventDefault();
                      this.props.history.push(rowInfo.row.siret.props.to);
                    }
                  };
                }}
                defaultFilterMethod={(filter, row) => {
                  const id = filter.pivotId || filter.id;
                  const filterValue = filter.value.toLowerCase();
                  let rowValue = row[id];

                  if (
                    typeof rowValue === "object" &&
                    rowValue.props &&
                    rowValue.props.children
                  ) {
                    // If is a component not rendered
                    rowValue = rowValue.props.children;
                  }

                  if (typeof rowValue === "string") {
                    rowValue = rowValue.toLowerCase();
                  }

                  return rowValue !== undefined
                    ? String(rowValue).includes(filterValue)
                    : true;
                }}
                columns={[
                  {
                    Header: "SIRET",
                    id: "siret",
                    minWidth: 120,
                    accessor: e =>
                      Value({
                        value: e.etablissement.siret,
                        empty: "-",
                        link: `/establishment/${e.etablissement.siret}`
                      })
                  },
                  {
                    Header: "État",
                    id: "etat",
                    minWidth: 80,
                    accessor: e => (
                      <>
                        {e.etablissement.etat_etablissement &&
                        e.etablissement.etat_etablissement === "A" ? (
                          <div style={{ textAlign: "center" }}>
                            <FontAwesomeIcon
                              data-tip
                              data-for="active"
                              className="icon--success"
                              icon={faCircle}
                              id="active"
                            />
                            <ReactTooltip id="active" effect="solid">
                              <span>Actif</span>
                            </ReactTooltip>
                          </div>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <FontAwesomeIcon
                              data-tip
                              data-for="closed"
                              className="icon--danger"
                              icon={faSquare}
                              id="closed"
                            />
                            <ReactTooltip id="closed" effect="solid">
                              <span>Fermé</span>
                            </ReactTooltip>
                          </div>
                        )}
                      </>
                    )
                  },
                  {
                    Header: "Raison Sociale / Nom",
                    id: "nom",
                    minWidth: 300,
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.nom_commercial ||
                          `${e.etablissement.prenom} ${e.etablissement.nom}`,
                        empty: "-"
                      })
                  },
                  {
                    Header: "Cat. Etablissement",
                    id: "categorie_etablissement",
                    minWidth: 200,
                    accessor: e =>
                      Value({
                        value: e.etablissement.categorie_etablissement,
                        empty: "-"
                      })
                  },
                  {
                    Header: "Effectif",
                    id: "effectif",
                    minWidth: 150,
                    accessor: e =>
                      Value({
                        value: isActiveEstablishment(e.etablissement)
                          ? e.etablissement.dernier_effectif_physique ||
                            staffSizeRanges[
                              e.etablissement.tranche_effectif_insee
                            ]
                          : "0 salarié",
                        empty: "-"
                      })
                  },
                  {
                    Header: "Code postal",
                    id: "code_postal",
                    minWidth: 200,
                    accessor: e =>
                      `${Value({
                        value:
                          e.etablissement.adresse_components &&
                          e.etablissement.adresse_components.code_postal,
                        empty: "-"
                      })}\u00A0(${Value({
                        value:
                          e.etablissement.adresse_components &&
                          e.etablissement.adresse_components.localite,
                        empty: "-"
                      })})`
                  },
                  {
                    Header: "Activité",
                    id: "activite",
                    minWidth: 200,
                    accessor: e => {
                      const { naf, libelle_naf } = e.etablissement;
                      return (
                        naf &&
                        Value({
                          value: `${naf === null ? "" : naf} ${
                            libelle_naf === null ? "" : " - " + libelle_naf
                          }`
                        })
                      );
                    }
                  }
                ]}
                previousText="Précédent"
                nextText="Suivant"
                loadingText="Chargement..."
                noDataText="Aucune données"
                pageText="Page"
                ofText="/"
                rowsText="lignes"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchResults);
