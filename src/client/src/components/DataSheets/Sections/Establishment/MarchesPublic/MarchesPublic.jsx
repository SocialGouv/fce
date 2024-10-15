import PropTypes from "prop-types";
import React, { useState } from "react";
import Select from "react-select";

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
import { selectCustomStyles } from "../../../../Search/Filters/customStyles";
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
import { exportToXLSX } from "./hooks.js";
import { useMarchesPublicWithEtablissements } from "./marchesPublic.gql.js";

const MarchesPublic = ({ siret }) => {
  const { enrichedMarches, loading, error } =
    useMarchesPublicWithEtablissements(siret);

  const [accordionOpen, setAccordionOpen] = useState(true);
  const { items, requestSort, sortConfig } = useSortableData(enrichedMarches, {
    direction: "descending",
    key: "dateNotification",
  });
  const columnsOption = [
    { idDefault: true, isFixed: true, label: "Acheteur", value: "acheteur" },
    { idDefault: true, isFixed: true, label: "Département", value: "city" },
    { idDefault: true, label: "Objet", value: "objet" },
    { label: "CPV", value: "cpv_libelle" },
    { label: "Procédure", value: "procedure" },
    { idDefault: true, label: "Montant", value: "montant" },
    { idDefault: true, label: "Notifié le", value: "dateNotification" },
    { idDefault: true, label: "Durée", value: "dureeMois" },
  ];
  const [selectedColumns, setSelectedColumns] = useState(
    columnsOption.filter((col) => col.idDefault)
  );
  if (error || !siret) {
    return null;
  }

  const handleExport = () => {
    exportToXLSX(items, `commandes_publiques${siret}.xlsx`);
  };

  const handleColumnChange = (selectedOptions) => {
    const fixedColumns = columnsOption.filter((col) => col.isFixed); // Récupérer les colonnes fixes

    // Ajouter les colonnes fixes même si elles sont "désélectionnées"
    const newSelectedColumns = [
      ...fixedColumns,
      ...selectedOptions.filter((option) => !option.isFixed),
    ];

    setSelectedColumns(newSelectedColumns);
  };

  return (
    <section id="marches" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={" Commandes publiques"}
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
                    <label htmlFor="column-select">
                      Sélectionner les colonnes (au moins 2) :
                    </label>
                    <div className="section-datas-marches-actions">
                      <div className="column-selector">
                        <Select
                          isMulti
                          options={columnsOption}
                          value={selectedColumns} // Extraire les valeurs pour le champ `select`
                          closeMenuOnSelect={false}
                          onChange={(option) => {
                            handleColumnChange(option);
                          }}
                          isClearable={selectedColumns.length > 2}
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                          styles={selectCustomStyles}
                        />
                      </div>
                      <div className="section-datas-marches">
                        <button
                          type="button"
                          className={"export-button"}
                          onClick={handleExport}
                        >
                          <span>
                            <Download />
                          </span>
                          {/* Exporter */}
                        </button>
                      </div>
                    </div>

                    <NonBorderedTable
                      className="direccte-interactions-establishment__table"
                      isScrollable={items?.length > 10}
                    >
                      <thead>
                        <tr>
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("acheteur") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="acheteur"
                                requestSort={requestSort}
                                label="Acheteur"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("city") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="city"
                                requestSort={requestSort}
                                label="Departement"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("objet") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="objet"
                                requestSort={requestSort}
                                label="Objet"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("cpv_libelle") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="cpv_libelle"
                                requestSort={requestSort}
                                label="CPV"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("procedure") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="procedure"
                                requestSort={requestSort}
                                label="Procédure"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("montant") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="montant"
                                requestSort={requestSort}
                                label="Montant"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("dateNotification") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="dateNotification"
                                requestSort={requestSort}
                                label="Notifié le"
                              />
                            </th>
                          )}
                          {selectedColumns
                            .map((col) => col.value)
                            .includes("dureeMois") && (
                            <th>
                              <SortableButton
                                sortConfig={sortConfig}
                                columnKey="dureeMois"
                                requestSort={requestSort}
                                label="Durée"
                              />
                            </th>
                          )}
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
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("acheteur") && (
                                <td className="table-cell">
                                  <SeeDetailsLink
                                    text={getAcheteur(marche)}
                                    link={`/establishment/${marche?.acheteur_id}/`}
                                    className={"list"}
                                  />
                                </td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("city") && (
                                <td className="table-cell">{adresse}</td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("objet") && (
                                <td>
                                  <Value
                                    value={formatUpperCase(marche?.objet)}
                                  />
                                </td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("cpv_libelle") && (
                                <td>
                                  <Value
                                    value={formatUpperCase(marche?.cpv_libelle)}
                                  />
                                </td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("procedure") && (
                                <td>
                                  <Value
                                    value={formatUpperCase(marche?.procedure)}
                                  />
                                </td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("montant") && (
                                <td>
                                  <Value
                                    value={formatChiffre(marche?.montant)}
                                  />
                                </td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("dateNotification") && (
                                <td>
                                  <Value value={marche?.dateNotification} />
                                </td>
                              )}
                              {selectedColumns
                                .map((col) => col.value)
                                .includes("dureeMois") && (
                                <td>
                                  <Value
                                    value={convertirMoisEnAnnees(
                                      marche?.dureeMois
                                    )}
                                  />
                                </td>
                              )}
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
                  {"Aucune commande publique connue"}
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
