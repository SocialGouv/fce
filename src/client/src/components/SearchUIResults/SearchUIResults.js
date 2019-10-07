import React from "react";
import { Alert } from "reactstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faSquare, faCircle } from "@fortawesome/fontawesome-pro-solid";
import Value from "../shared/Value";
import AwesomeTable from "../shared/AwesomeTable";
import { withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import Config from "./../../services/Config";
import { isActiveEstablishment } from "../../helpers/Establishment";

const SearchResults = () => {
  const staffSizeRanges = {
    ...Config.get("inseeSizeRanges"),
    "0 salarié": "0 salarié"
  };

  return (
    <div className="app-searchResults mx-6">
      {results && results.length >= 1 && (
        <h2 className="title my-2">
          {pagination.items} établissement{pagination.items > 1 && "s"} trouvé
          {pagination.items > 1 && "s"}
        </h2>
      )}

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
            <AwesomeTable
              showPagination={pagination && pagination.pages > 1}
              page={{
                min: 1,
                max: pagination.pages,
                currentPage: pagination.page
              }}
              prevText="Précédent"
              nextText="Suivant"
              nextPage={nextPage}
              prevPage={prevPage}
              selectedPage={page => selectedPage(page)}
              loading={loading}
              data={results}
              fields={[
                {
                  headName: "SIRET",
                  importantHead: true,
                  accessor: enterprise =>
                    Value({
                      value: enterprise.etablissement.siret,
                      empty: "-",
                      link: `/establishment/${enterprise.etablissement.siret}`
                    }),
                  link: enterprise =>
                    `/establishment/${enterprise.etablissement.siret}`
                },
                {
                  headName: "Etat",
                  accessor: enterprise => (
                    <>
                      {enterprise.etablissement.etat_etablissement &&
                      enterprise.etablissement.etat_etablissement === "A" ? (
                        <div style={{ textAlign: "center" }}>
                          <FontAwesomeIcon
                            data-tip
                            data-for="active"
                            className="icon--success mr-1"
                            icon={faCircle}
                            id="active"
                          />
                          <span>Ouvert</span>
                          <ReactTooltip id="active" effect="solid">
                            <span>Ouvert</span>
                          </ReactTooltip>
                        </div>
                      ) : (
                        <div style={{ textAlign: "center" }}>
                          <FontAwesomeIcon
                            data-tip
                            data-for="closed"
                            className="icon--danger mr-1"
                            icon={faSquare}
                            id="closed"
                          />
                          <span>Fermé</span>
                          <ReactTooltip id="closed" effect="solid">
                            <span>Fermé</span>
                          </ReactTooltip>
                        </div>
                      )}
                    </>
                  )
                },
                {
                  headName: "Raison sociale / Nom",
                  accessor: enterprise =>
                    Value({
                      value:
                        enterprise.etablissement.nom_commercial ||
                        `${enterprise.etablissement.prenom} ${
                          enterprise.etablissement.nom
                        }`,
                      empty: "-"
                    })
                },
                {
                  headName: "Catégorie établissement",
                  accessor: enterprise =>
                    Value({
                      value: enterprise.etablissement.categorie_etablissement,
                      empty: "-"
                    })
                },
                {
                  headName: "Code postal",
                  accessor: enterprise =>
                    `${Value({
                      value:
                        enterprise.etablissement.adresse_components &&
                        enterprise.etablissement.adresse_components.code_postal,
                      empty: "-"
                    })}\u00A0(${Value({
                      value:
                        enterprise.etablissement.adresse_components &&
                        enterprise.etablissement.adresse_components.localite,
                      empty: "-"
                    })})`
                },
                {
                  headName: "Effectif",
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
                  headName: "Activité",
                  accessor: enterprise => {
                    const { naf, libelle_naf } = enterprise.etablissement;
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
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(withSearch(SearchResults));
