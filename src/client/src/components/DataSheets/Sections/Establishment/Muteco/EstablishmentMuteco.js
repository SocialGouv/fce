import React from "react";
import Value from "../../../../shared/Value";
import Proptypes from "prop-types";
import _get from "lodash.get";
import Data from "../../SharedComponents/Data";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/fontawesome-pro-solid";

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
        <h2 className="title">Mutations Economiques</h2>
      </div>
      <div className="section-datas">
        <Data name="Activité partielle" value={hasActivitePartielle} />
        {hasActivitePartielle && (
          <table className="table is-hoverable is-bordered mt-2">
            <thead>
              <tr>
                <th>Numéro de convention</th>
                <th>Nombre d'avenants</th>
                <th>Date de décision (convention initiale)</th>
                <th>Nombre total d'heures autorisées</th>
                <th>Nombre total d'heures consommées</th>
                <th>Motif</th>
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
                    <td>{nbHeuresAutorisees}</td>
                    <td>{nbHeuresConsommees}</td>
                    <td>{motif}</td>
                  </tr>
                )
              )}
            </tbody>

            {totalActivitePartielle && (
              <tfoot>
                <th colSpan="3">Total : </th>
                <td>{totalActivitePartielle.nbHeuresAutorisees}</td>
                <td>{totalActivitePartielle.nbHeuresConsommees}</td>
                <td />
              </tfoot>
            )}
          </table>
        )}

        <Data
          name="PSE"
          value={
            _get(establishment, `pse_en_projet_ou_en_cours`)
              ? "Oui"
              : "Information en cours de négociation"
          }
        />
        {Array.isArray(establishment.pse_en_projet_ou_en_cours) &&
          establishment.pse_en_projet_ou_en_cours.length > 0 && (
            <table className="table is-hoverable is-bordered mt-2">
              <thead>
                <tr>
                  <th />
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => (
                      <th key={year}>
                        {_get(
                          establishment,
                          `pse_en_projet_ou_en_cours[${year}].year`
                        )}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Etat</th>
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => (
                      <td key={year}>
                        <Value
                          value={_get(
                            establishment,
                            `pse_en_projet_ou_en_cours[${year}].etat`
                          )}
                          empty="-"
                        />
                      </td>
                    )
                  )}
                </tr>
                <tr>
                  <th scope="row">Poste</th>
                  {Object.keys(establishment.pse_en_projet_ou_en_cours).map(
                    year => (
                      <td key={year}>
                        <Value
                          value={_get(
                            establishment,
                            `pse_en_projet_ou_en_cours[${year}].poste`
                          )}
                          empty="-"
                        />
                      </td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          )}
      </div>
    </section>
  );
};

EstablishmentMuteco.propTypes = {
  establishment: Proptypes.object.isRequired
};

export default EstablishmentMuteco;
