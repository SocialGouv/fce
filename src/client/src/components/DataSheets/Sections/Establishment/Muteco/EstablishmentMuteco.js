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

  const hasPse = establishment.pse && establishment.pse.length;

  const pse = {
    inProcess:
      hasPse &&
      establishment.pse.find(
        pse => pse.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      hasPse &&
      establishment.pse.filter(
        pse =>
          pse.etat_du_dossier !== "en_cours_procedure" &&
          (pse.type_de_dossier !== "pse" ||
            pse.rupture_contrat_debut + pse.rupture_contrat_fin !== 0)
      )
  };

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

        <Data name="Procédure en cours" value={!!pse.inProcess} />
        {pse.inProcess && (
          <Data
            name="Date d'enregistrement"
            value={pse.inProcess.date_enregistrement}
          />
        )}
        {pse.validsOrProbates && (
          <table className="table mt-2">
            <thead>
              <tr>
                <th>Numéro de dossier</th>
                <th>Date d'enregistrement</th>
                <th>
                  Nombre maximum de ruptures de contrats de travail envisagées
                  dans l'établissement
                </th>
              </tr>
            </thead>
            <tbody>
              {pse.validsOrProbates.map((folder, index) => (
                <tr key={folder.numero_de_dossier.concat(index)}>
                  <td className="has-text-centered">
                    <Value value={folder.numero_de_dossier} empty="-" />
                  </td>
                  <td className="has-text-centered">
                    <Value value={folder.date_enregistrement} empty="-" />
                  </td>
                  <td className="has-text-centered">
                    <Value
                      value={
                        folder.rupture_contrat_fin ||
                        folder.rupture_contrat_debut
                      }
                      empty="-"
                      nonEmptyValues="0"
                    />
                  </td>
                </tr>
              ))}
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
