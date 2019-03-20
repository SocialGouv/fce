import React from "react";
import { Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faPrint,
  faCircle
} from "@fortawesome/fontawesome-pro-solid";
import Terms from "./Terms";
import ReactTable from "react-table";
import Value from "../../elements/Value";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="app-searchResults">
        <div className="columns result-row">
          <div className="column is-12">
            {!Array.isArray(this.props.results) ? (
              <Alert color="danger">Une erreur est survenue.</Alert>
            ) : !this.props.results.length ? (
              <Alert color="info">Aucun résultat</Alert>
            ) : (
              ""
            )}

            {Array.isArray(this.props.results) && this.props.results.length ? (
              <ReactTable
                data={this.props.results}
                className="table is-striped is-hoverable"
                defaultPageSize={this.props.results.length}
                showPagination={this.props.pagination && this.props.pagination.pages > 1}
                showPageSizeOptions={false}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                pages={this.props.pagination && this.props.pagination.pages}
                onFetchData={this.props.fetchData}
                loading={this.props.loading}
                getTrProps={(state, rowInfo) => {
                  return {
                    onClick: e => {
                      e && e.preventDefault();
                      this.props.history.push(
                        "/establishment/" + rowInfo.original.etablissement.siret
                      );
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
                    minWidth: 150,
                    accessor: e =>
                      Value({
                        value: e.etablissement.siret,
                        empty: "-",
                        link: `/establishment/${e.etablissement.siret}`
                      })
                  },
                  {
                    Header: "SIREN",
                    id: "siren",
                    minWidth: 120,
                    accessor: e =>
                      Value({
                        value: e.siren,
                        empty: "-",
                        link: `/enterprise/${e.siren}`
                      })
                  },
                  {
                    Header: "Raison Sociale / Nom",
                    id: "nom",
                    minWidth: 350,
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.nom_commercial ||
                          `${e.etablissement.prenom} ${e.etablissement.nom}`,
                        empty: "-"
                      })
                  },
                  {
                    Header: "État",
                    id: "etat",
                    minWidth: 80,
                    accessor: e =>
                      e.etablissement.etat_etablissement &&
                      FontAwesomeIcon({
                        className: classNames(
                          e.etablissement.etat_etablissement == "A"
                            ? "icon--success"
                            : "icon--danger"
                        ),
                        icon: faCircle
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
                    Header: "Département",
                    id: "departement",
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.adresse_components &&
                          e.etablissement.adresse_components.code_postal &&
                          e.etablissement.adresse_components.code_postal.substr(
                            0,
                            2
                          ),
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
                    Header: "Interactions",
                    id: "total-interactions",
                    minWidth: 80,
                    accessor: e =>
                      Value({
                        value: e.etablissement.totalInteractions.total,
                        empty: ""
                      })
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
