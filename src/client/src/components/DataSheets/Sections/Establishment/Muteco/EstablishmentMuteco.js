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

  const hasPse =
    establishment.pse &&
    (establishment.pse.rupture_contrat_debut !== 0 ||
      establishment.pse.rupture_contrat_fin !== 0);

  return (
    <section id="muteco" className="data-sheet__section">
      <div className="section-header">
        <span className="icon">
          <FontAwesomeIcon icon={faUmbrella} />
        </span>
        <h2 className="title">Mutations Économiques</h2>
      </div>
      <div className="section-datas">
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
                <th className="th">Nombre d'avenants</th>
                <th className="th">Date de décision (convention initiale)</th>
                <th className="th">Nombre total d'heures autorisées</th>
                <th className="th">Nombre total d'heures consommées</th>
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
                    <td>{nbHeuresAutorisees}</td>
                    <td>{nbHeuresConsommees}</td>
                    <td>{motif}</td>
                  </tr>
                )
              )}
            </tbody>

            {totalActivitePartielle && (
              <tfoot>
                <tr>
                  <th colSpan="3">Total : </th>
                  <td>{totalActivitePartielle.nbHeuresAutorisees}</td>
                  <td>{totalActivitePartielle.nbHeuresConsommees}</td>
                  <td />
                </tr>
              </tfoot>
            )}
          </table>
        )}

        <Data
          name="PSE"
          value={hasPse ? "oui" : "aucun pse connu"}
          columnClasses={["is-8", "is-4"]}
        />
        {hasPse && (
          <table className="table is-bordered mt-2">
            <thead>
              <tr>
                <th>Nbr de ruptures de contrats en début de procédure</th>
                <th>Nbr de ruptures de contrats en fin de procédure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="has-text-centered">
                  <Value
                    value={establishment.pse.rupture_contrat_debut}
                    empty="-"
                  />
                </td>
                <td className="has-text-centered">
                  <Value
                    value={establishment.pse.rupture_contrat_fin}
                    empty="-"
                  />
                </td>
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
