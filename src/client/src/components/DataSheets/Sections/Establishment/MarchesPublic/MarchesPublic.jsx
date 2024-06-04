import PropTypes from "prop-types";
import React, { useState } from "react";

import Source from "../../../../../containers/Source/Source.js";
import { formatSiret } from "../../../../../helpers/utils/format.js";
import { convertirMoisEnAnnees } from "../../../../../helpers/utils/utils.js";
import { formatChiffre } from "../../../../../utils/donnees-ecofi/donnees-ecofi.js";
import { formatUpperCase } from "../../../../../utils/entreprise/entreprise.js";
import Value from "../../../../shared/Value/index.js";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable.js";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink/SeeDetailsLink.js";
import Subcategory from "../../SharedComponents/Subcategory/index.js";
import { useMarchesPublic } from "./marchesPublic.gql.js";

const MarchesPublic = ({ siret }) => {
  const { loading, data, error } = useMarchesPublic(siret);
  const [accordionOpen, setAccordionOpen] = useState(true);

  if (loading || error || !siret) {
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
            <div className="data-sheet--table data-sheet--table-to-left">
              {data?.marches?.length > 0 && (
                <NonBorderedTable
                  className="direccte-interactions-establishment__table"
                  isScrollable={data?.marches?.length > 10}
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
                    {data?.marches?.map(
                      ({
                        acheteur_id,
                        objet,
                        cpv_libelle,
                        procedure,
                        montant,
                        dateNotification,
                        dureeMois,
                      }) => (
                        <tr key={acheteur_id + dateNotification}>
                          <td className="table-cell--nowrap">
                            <SeeDetailsLink
                              text={formatSiret(acheteur_id)}
                              link={`/establishment/${acheteur_id}/`}
                            />
                          </td>

                          <td>
                            <Value value={formatUpperCase(objet)} />
                          </td>
                          <td>
                            <Value value={formatUpperCase(cpv_libelle)} />
                          </td>
                          <td>
                            <Value value={formatUpperCase(procedure)} />
                          </td>
                          <td>
                            <Value value={formatChiffre(montant)} />
                          </td>
                          <td>
                            <Value value={dateNotification} />
                          </td>
                          <td>
                            <Value value={convertirMoisEnAnnees(dureeMois)} />
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </NonBorderedTable>
              )}
            </div>
            {data?.marches?.length === 0 && (
              <div className="data-value is-centred">
                {"Aucun appel d'offres connu"}
              </div>
            )}
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
