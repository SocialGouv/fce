import PropTypes from "prop-types";
import React, { useState } from "react";

import Source from "../../../../../containers/Source/Source.js";
import { formatSiret } from "../../../../../helpers/utils/format.js";
import { convertirMoisEnAnnees } from "../../../../../helpers/utils/utils.js";
import { formatChiffre } from "../../../../../utils/donnees-ecofi/donnees-ecofi.js";
import { formatUpperCase } from "../../../../../utils/entreprise/entreprise.js";
import { getCity } from "../../../../../utils/establishment/establishment";
import LoadableContent from "../../../../shared/LoadableContent/LoadableContent.js";
import Value from "../../../../shared/Value/index.js";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable.js";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink/SeeDetailsLink.js";
import Subcategory from "../../SharedComponents/Subcategory/index.js";
import { useMarchesPublicWithEtablissements } from "./marchesPublic.gql.js";

const MarchesPublic = ({ siret }) => {
  const { enrichedMarches, loading, error } =
    useMarchesPublicWithEtablissements(siret);

  const [accordionOpen, setAccordionOpen] = useState(true);

  if (error || !siret) {
    return null;
  }

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
                {enrichedMarches?.length > 0 && (
                  <NonBorderedTable
                    className="direccte-interactions-establishment__table"
                    isScrollable={enrichedMarches?.length > 10}
                  >
                    <thead>
                      <tr>
                        <th>Acheteur</th>
                        <th>Objet</th>
                        <th>CPV</th>
                        <th>Procédure</th>
                        <th>Montant</th>
                        <th>Notifié le</th>
                        <th>Durée</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrichedMarches?.map((marche) => {
                        const adresse = getCity(marche?.etablissement);

                        return (
                          <tr
                            key={marche?.acheteur_id + marche?.dateNotification}
                          >
                            <td className="table-cell--sm-cell">
                              <SeeDetailsLink
                                text={
                                  formatUpperCase(
                                    marche?.etablissement?.etb_raisonsociale
                                  ) || formatSiret(marche?.acheteur_id)
                                }
                                link={`/establishment/${marche?.acheteur_id}/`}
                                description={formatUpperCase(adresse)}
                                className={"list"}
                              />
                            </td>
                            {/* <td className="table-cell--sm-cell ">
                            {" "}
                            <Value value={adresse} />
                          </td> */}

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
                                value={convertirMoisEnAnnees(marche?.dureeMois)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </NonBorderedTable>
                )}
              </div>
              {enrichedMarches?.length === 0 && (
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
