import React from "react";
import Proptypes from "prop-types";
import PSE from "./PSE";
import RCC from "./RCC";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import _get from "lodash.get";
import Data from "../../SharedComponents/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/pro-solid-svg-icons";

const EstablishmentMuteco = ({ establishment }) => {
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
        <Subcategory subtitle="Activité partielle">
          <Data
            name="Recours sur les 24 derniers mois"
            value={hasActivitePartielle}
            columnClasses={["is-8", "is-4"]}
          />
          {hasActivitePartielle && (
            <table className="table is-hoverable is-bordered mt-2">
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
                      <td>{Math.round(nbHeuresAutorisees)}</td>
                      <td>{Math.round(nbHeuresConsommees)}</td>
                      <td>{motif}</td>
                    </tr>
                  )
                )}
              </tbody>

              {totalActivitePartielle && (
                <tfoot>
                  <tr>
                    <th colSpan="3">Total : </th>
                    <td>
                      {Math.round(totalActivitePartielle.nbHeuresAutorisees)}
                    </td>
                    <td>
                      {Math.round(totalActivitePartielle.nbHeuresConsommees)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              )}
            </table>
          )}
        </Subcategory>
        <PSE establishment={establishment} />
        <RCC establishment={establishment} />
      </div>
    </section>
  );
};

EstablishmentMuteco.propTypes = {
  establishment: Proptypes.object.isRequired
};

export default EstablishmentMuteco;
