import React from "react";
import "./searchResults.css";
import { Row, Col, Button, Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faFileExcel, faPrint } from "@fortawesome/fontawesome-pro-light";
import Terms from "./Terms";
import ReactTable from "react-table";
import Value from "../../elements/Value";
import { withRouter } from "react-router-dom";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="app-searchResults">
        <Row className="justify-content-md-center">
          <Col md="12">
            <h1 className="title">Résultats de recherche</h1>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md="10">
            <Terms
              terms={this.props.terms}
              nbResults={this.props.results.length}
            />
          </Col>
        </Row>

        <Row className="justify-content-md-center d-print-none">
          <Col md="12" className="text-center export-buttons">
            <Button color="primary" onClick={() => window.print()}>
              <FontAwesomeIcon icon={faPrint} /> Imprimer
            </Button>
            {this.props.terms.csvURL ? (
              <Button
                outline
                color="secondary"
                onClick={e => window.open(this.props.terms.csvURL, "_blank")}
              >
                <FontAwesomeIcon icon={faFileExcel} /> Export Excel
              </Button>
            ) : null}
          </Col>
        </Row>

        <Row className="justify-content-md-center result-row">
          <Col md="12">
            {!Array.isArray(this.props.results) ? (
              <Alert color="danger">Une erreur est survenue</Alert>
            ) : !this.props.results.length ? (
              <Alert color="info">Aucun résultat</Alert>
            ) : (
              ""
            )}

            {Array.isArray(this.props.results) && this.props.results.length ? (
              <ReactTable
                data={this.props.results}
                defaultPageSize={
                  this.props.results.length >= 25
                    ? 25
                    : this.props.results.length
                }
                className="table -striped -highlight"
                filterable={true}
                showPagination={this.props.results.length > 25}
                pageSizeOptions={[25, 50, 100]}
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
                defaultFilterMethod={(filter, row, column) => {
                  const id = filter.pivotId || filter.id;
                  const filterValue = filter.value.toLowerCase();
                  const rowValue =
                    typeof row[id] === "string"
                      ? row[id].toLowerCase()
                      : row[id];

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
                        link: `/enterprise/${e.etablissement.siret}`
                      })
                  },
                  {
                    Header: "SIREN",
                    id: "siren",
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
                    minWidth: 300,
                    accessor: e =>
                      Value({ value: e.raison_sociale || e.nom, empty: "-" })
                  },
                  {
                    Header: "État",
                    id: "etat",
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.etat_etablissement &&
                          e.etablissement.etat_etablissement.label,
                        empty: "-"
                      })
                  },
                  {
                    Header: "Code postal",
                    id: "code_postal",
                    minWidth: 200,
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.adresse_components &&
                          e.etablissement.adresse_components.code_postal &&
                          `${
                            e.etablissement.adresse_components.code_postal
                          }\u00A0(${e.etablissement.adresse_components
                            .localite || ""})`,
                        empty: "-"
                      })
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
                    Header: "Activité",
                    id: "activite",
                    minWidth: 300,
                    accessor: e =>
                      Value({ value: e.etablissement.activite, empty: "-" })
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
                        value: e.etablissement.totalInteractions,
                        empty: ""
                      })
                  },
                  {
                    Header: "Pole C",
                    id: "pole-c",
                    minWidth: 80,
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.interactions &&
                          e.etablissement.interactions["C"],
                        empty: ""
                      })
                  },
                  {
                    Header: "Pole 3E",
                    id: "pole-3e",
                    minWidth: 80,
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.interactions &&
                          e.etablissement.interactions["3E"],
                        empty: ""
                      })
                  },
                  {
                    Header: "Pole T",
                    id: "pole-t",
                    minWidth: 80,
                    accessor: e =>
                      Value({
                        value:
                          e.etablissement.interactions &&
                          e.etablissement.interactions["T"],
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(SearchResults);
