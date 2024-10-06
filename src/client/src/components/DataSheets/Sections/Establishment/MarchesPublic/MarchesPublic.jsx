import PropTypes from "prop-types";
import React, { useState } from "react";

import Source from "../../../../../containers/Source/Source.js";
import {
  convertirMoisEnAnnees,
  joinNoFalsy,
} from "../../../../../helpers/utils/utils.js";
import { formatChiffre } from "../../../../../utils/donnees-ecofi/donnees-ecofi.js";
import { formatUpperCase } from "../../../../../utils/entreprise/entreprise.js";
import {
  getCity,
  getCodePostal,
} from "../../../../../utils/establishment/establishment";
import Download from "../../../../shared/Icons/Download.jsx";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent.js";
import Value from "../../../../shared/Value/index.js";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import {
  getAcheteur,
  useSortableData,
} from "../../SharedComponents/NonBorderedTable/hooks.js";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable.js";
import SortableButton from "../../SharedComponents/NonBorderedTable/SortableButton.jsx";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink/SeeDetailsLink.js";
import Subcategory from "../../SharedComponents/Subcategory/index.js";
import { exportToCSV } from "./hooks.js";
import { useMarchesPublicWithEtablissements } from "./marchesPublic.gql.js";

const MarchesPublic = ({ siret }) => {
  const { enrichedMarches, loading, error } =
    useMarchesPublicWithEtablissements(siret);

  const [accordionOpen, setAccordionOpen] = useState(true);
  const { items, requestSort, sortConfig } = useSortableData(enrichedMarches, {
    direction: "descending",
    key: "dateNotification",
  });

  if (error || !siret) {
    return null;
  }
  const handleExport = () => {
    exportToCSV(items, "exported_data.xlsx");
  };
  return (
    <section id="marches" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={" Appels d'offres"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <Subcategory>
            <div className="section-datas-marches">
              <Source
                si={"DECP"}
                hasDateImport={false}
                sourceCustom={null}
                sourceDate={null}
              />
            </div>
            <LoadableContent loading={loading} error={error}>
              <div className="data-sheet--table data-sheet--table-to-left">
                {items?.length > 0 && (
                  <>
                    <div className="section-datas-marches">
                      <button
                        type="button"
                        className={"export-button"}
                        onClick={handleExport}
                      >
                        <span>
                          <Download />
                        </span>
                        Exporter les données
                      </button>
                    </div>
                    <NonBorderedTable
                      className="direccte-interactions-establishment__table"
                      isScrollable={items?.length > 10}
                    >
                      <thead>
                        <tr>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="acheteur"
                              requestSort={requestSort}
                              label="Acheteur"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="city"
                              requestSort={requestSort}
                              label="Departement"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="objet"
                              requestSort={requestSort}
                              label="Objet"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="cpv_libelle"
                              requestSort={requestSort}
                              label="CPV"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="procedure"
                              requestSort={requestSort}
                              label="Procédure"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="montant"
                              requestSort={requestSort}
                              label="Montant"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="dateNotification"
                              requestSort={requestSort}
                              label="Notifié le"
                            />
                          </th>
                          <th>
                            <SortableButton
                              sortConfig={sortConfig}
                              columnKey="dureeMois"
                              requestSort={requestSort}
                              label="Durée"
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items?.map((marche, index) => {
                          const adresse = joinNoFalsy(
                            [
                              getCodePostal(marche?.etablissement),
                              getCity(marche?.etablissement),
                            ],
                            " - "
                          );

                          return (
                            <tr
                              key={`${index}-${marche?.acheteur_id}-${marche?.dateNotification}`}
                            >
                              <td className="table-cell">
                                <SeeDetailsLink
                                  text={getAcheteur(marche)}
                                  link={`/establishment/${marche?.acheteur_id}/`}
                                  // description={formatUpperCase(adresse)}
                                  className={"list"}
                                />
                              </td>
                              <td className="table-cell">{adresse}</td>

                              <td>
                                <Value value={formatUpperCase(marche?.objet)} />
                              </td>
                              <td>
                                <Value
                                  value={formatUpperCase(marche?.cpv_libelle)}
                                />
                              </td>
                              <td>
                                <Value
                                  value={formatUpperCase(marche?.procedure)}
                                />
                              </td>
                              <td>
                                <Value value={formatChiffre(marche?.montant)} />
                              </td>
                              <td>
                                <Value value={marche?.dateNotification} />
                              </td>
                              <td>
                                <Value
                                  value={convertirMoisEnAnnees(
                                    marche?.dureeMois
                                  )}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </NonBorderedTable>
                  </>
                )}
              </div>
              {items?.length === 0 && (
                <div className="data-value is-centred">
                  {"Aucun appel d'offres connu"}
                </div>
              )}
            </LoadableContent>
          </Subcategory>
        </div>
      )}
    </section>
  );
};

MarchesPublic.propTypes = {
  siret: PropTypes.string.isRequired,
};
export default MarchesPublic;
