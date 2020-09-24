import React from "react";
import PropTypes from "prop-types";
import Pse from "./Pse";
import Rcc from "./Rcc";
import Lice from "./Lice";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import _get from "lodash.get";
import Data from "../../SharedComponents/Data";
import Table from "../../SharedComponents/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/pro-solid-svg-icons";
import { formatNumber } from "../../../../../helpers/utils";

const EstablishmentMuteco = ({ establishment, enterprise }) => {
  const hasActivitePartielle = !!_get(establishment, `activite_partielle`);

  const totalActivitePartielle =
    hasActivitePartielle &&
    establishment.activite_partielle.length > 1 &&
    establishment.activite_partielle.reduce(
      (totals, { nbHeuresAutorisees, nbHeuresConsommees }) => {
        totals.nbHeuresAutorisees += parseFloat(nbHeuresAutorisees);
        totals.nbHeuresConsommees += parseFloat(nbHeuresConsommees);
        return totals;
      },
      { nbHeuresAutorisees: 0, nbHeuresConsommees: 0 }
    );

  return (
    <section id="muteco" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUmbrella} />
        </span>
        <h2 className="title">Mutations Économiques</h2>
      </div>
      <div className="section-datas">
        <Subcategory subtitle="Activité partielle" sourceSi="APART">
          <Data
            name="Recours sur les 24 derniers mois"
            value={hasActivitePartielle}
            columnClasses={["is-8", "is-4"]}
          />
          {hasActivitePartielle && (
            <Table isBordered>
              <thead>
                <tr>
                  <th className="th">Numéro de convention</th>
                  <th className="th">Nombre d{"'"}avenants</th>
                  <th className="th">Date de décision (convention initiale)</th>
                  <th className="th">Nombre total d{"'"}heures autorisées</th>
                  <th className="th">Nombre total d{"'"}heures consommées</th>
                  <th className="th">Motif</th>
                </tr>
              </thead>
              <tbody>
                {establishment.activite_partielle.map(
                  ({
                    numConvention,
                    nbAvenants,
                    date,
                    nbHeuresAutorisees,
                    nbHeuresConsommees,
                    motif
                  }) => (
                    <tr key={numConvention}>
                      <td>{numConvention}</td>
                      <td>{nbAvenants}</td>
                      <td>{<Value value={date} />}</td>
                      <td className="has-text-right">
                        {formatNumber(Math.round(nbHeuresAutorisees))}
                      </td>
                      <td className="has-text-right">
                        {formatNumber(Math.round(nbHeuresConsommees))}
                      </td>
                      <td>{motif}</td>
                    </tr>
                  )
                )}
              </tbody>

              {totalActivitePartielle && (
                <tfoot>
                  <tr>
                    <th colSpan="3" className="has-text-right">
                      Total{" "}
                    </th>
                    <td className="has-text-right">
                      {formatNumber(
                        Math.round(totalActivitePartielle.nbHeuresAutorisees)
                      )}
                    </td>
                    <td className="has-text-right">
                      {formatNumber(
                        Math.round(totalActivitePartielle.nbHeuresConsommees)
                      )}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </Table>
          )}
        </Subcategory>

        <Pse
          pseList={establishment.pse}
          siren={enterprise.siren}
          enterprisePse={enterprise.pse}
        />
        <Lice
          liceList={establishment.lice}
          siren={enterprise.siren}
          enterpriseLice={enterprise.lice}
        />
        <Rcc
          rccList={establishment.rcc}
          siren={enterprise.siren}
          enterpriseRcc={enterprise.rcc}
        />
      </div>
    </section>
  );
};

EstablishmentMuteco.propTypes = {
  establishment: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired
};

export default EstablishmentMuteco;
