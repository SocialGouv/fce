import PropTypes from "prop-types";
import React, { useState } from "react";

import { formatNumber } from "../../../../../helpers/utils";
import {
  getCumulatedValuesForEstablishment,
  getLatestConventionIteration,
} from "../../../../../utils/activite-partielle/activite-partielle";
import { getSirenFromSiret } from "../../../../../utils/establishment/establishment";
import {
  filterLice,
  filterPse,
  filterRcc,
} from "../../../../../utils/rupco/rupco";
import Value from "../../../../shared/Value";
import BlocTitle from "../../SharedComponents/BlocTitle/BlocTitle.jsx";
import Data from "../../SharedComponents/Data";
import NonBorderedTable from "../../SharedComponents/NonBorderedTable/NonBorderedTable";
import Subcategory from "../../SharedComponents/Subcategory";
import { useMutecoData } from "./EtablissementMuteco.gql";
import Lice from "./Lice";
import Pse from "./Pse";
import Rcc from "./Rcc";

const EtablissementMuteco = ({ siret }) => {
  const { data, loading, error } = useMutecoData(siret);
  const [accordionOpen, setAccordionOpen] = useState(false);

  if (loading || error) {
    return null;
  }

  const siren = getSirenFromSiret(siret);

  const activitePartielle = data.etablissements_activite_partielle;
  const hasActivitePartielle = activitePartielle.length > 0;

  const displayedActivitePartielle =
    getLatestConventionIteration(activitePartielle);

  const totalActivitePartielle =
    getCumulatedValuesForEstablishment(activitePartielle);

  const rupco = data.rupco_etablissements;

  const lice = filterLice(rupco);
  const pse = filterPse(rupco);
  const rcc = filterRcc(rupco);

  const otherRupco = data.otherRupco;

  return (
    <section id="muteco" className="data-sheet__bloc_section">
      <BlocTitle
        isOpen={accordionOpen}
        toggleAccordion={() => setAccordionOpen(!accordionOpen)}
        text={"Mutations Économiques"}
      />

      {accordionOpen && (
        <div className="section-datas">
          <Subcategory subtitle="Activité partielle" sourceSi="APART">
            <Data
              name="Recours sur les 24 derniers mois"
              value={hasActivitePartielle}
              columnClasses={["is-6", "is-6"]}
              className="has-no-border"
            />
            {hasActivitePartielle && (
              <div className="data-sheet--table ">
                <NonBorderedTable
                  className="bordered"
                  isScrollable={displayedActivitePartielle.length > 6}
                >
                  <thead>
                    <tr>
                      <th className="th">Numéro de convention</th>
                      <th className="th">Nombre d{"'"}avenants</th>
                      <th className="th">
                        Date de décision (convention initiale)
                      </th>
                      <th className="th">
                        Nombre total d{"'"}heures autorisées
                      </th>
                      <th className="th">
                        Nombre total d{"'"}heures consommées
                      </th>
                      <th className="th">Motif</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedActivitePartielle.map(
                      ({
                        num_convention,
                        num_avenant,
                        date_decision,
                        nb_h_auto_cum,
                        nb_h_conso_cum,
                        cause,
                      }) => (
                        <tr key={num_convention}>
                          <td>{num_convention}</td>
                          <td>{num_avenant + 1}</td>
                          <td>{<Value value={date_decision} />}</td>
                          <td>{formatNumber(Math.round(nb_h_auto_cum))}</td>
                          <td>{formatNumber(Math.round(nb_h_conso_cum))}</td>
                          <td>{cause}</td>
                        </tr>
                      )
                    )}
                  </tbody>

                  {totalActivitePartielle && (
                    <tfoot>
                      <tr>
                        <th> </th>
                        <th> </th>
                        <th className="tfoot-recour"> Total </th>
                        <td>
                          {formatNumber(
                            Math.round(totalActivitePartielle.nb_h_auto_cum)
                          )}
                        </td>
                        <td>
                          {formatNumber(
                            Math.round(totalActivitePartielle.nb_h_conso_cum)
                          )}
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  )}
                </NonBorderedTable>
              </div>
            )}
          </Subcategory>

          <Pse pseList={pse} siren={siren} otherRucpo={otherRupco} />
          <Lice liceList={lice} siren={siren} otherRupco={otherRupco} />
          <Rcc rccList={rcc} siren={siren} otherRupco={otherRupco} />
        </div>
      )}
    </section>
  );
};

EtablissementMuteco.propTypes = {
  siret: PropTypes.string.isRequired,
};

export default EtablissementMuteco;
