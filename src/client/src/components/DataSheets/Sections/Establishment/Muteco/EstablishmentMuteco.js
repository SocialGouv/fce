import React from "react";
import Proptypes from "prop-types";
import Value from "../../../../shared/Value";
import Subcategory from "../../SharedComponents/Subcategory";
import _get from "lodash.get";
import Data from "../../SharedComponents/Data";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faUmbrella } from "@fortawesome/fontawesome-pro-solid";
import { hasInclude } from "../../../../../helpers/utils";

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

  const pseList = {
    inProcess:
      hasPse &&
      establishment.pse.find(
        pse =>
          hasInclude(pse.type_de_dossier, ["PSE", "pse"]) &&
          pse.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      hasPse &&
      establishment.pse.filter(
        pse =>
          hasInclude(pse.type_de_dossier, ["PSE", "pse"]) &&
          pse.etat_du_dossier !== "en_cours_procedure"
      )
  };

  const rccList = {
    inProcess:
      hasPse &&
      establishment.pse.find(
        pse =>
          hasInclude(pse.type_de_dossier, ["RCC", "rcc"]) &&
          pse.etat_du_dossier === "en_cours_procedure"
      ),
    validsOrProbates:
      hasPse &&
      establishment.pse.filter(
        pse =>
          hasInclude(pse.type_de_dossier, ["RCC", "rcc"]) &&
          pse.etat_du_dossier !== "en_cours_procedure"
      )
  };

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
        <Subcategory subtitle="Plan de sauvegarde de l'emploi">
          <Data name="Procédure en cours" value={!!pseList.inProcess} />
          {pseList.inProcess && (
            <Data
              name="Date d'enregistrement"
              value={pseList.inProcess.date_enregistrement}
            />
          )}
          {pseList.validsOrProbates && (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th>Numéro de dossier</th>
                  <th className="has-text-centered">Date d'enregistrement</th>
                  <th className="has-text-centered">
                    Nombre maximum de ruptures de contrats de travail envisagées
                    dans l'établissement
                  </th>
                </tr>
              </thead>
              <tbody>
                {pseList.validsOrProbates.map((dossier, index) => (
                  <tr key={dossier.numero_de_dossier.concat(index)}>
                    <td className="w-25">
                      <Value value={dossier.numero_de_dossier} />
                    </td>
                    <td className="has-text-centered w-25">
                      <Value value={dossier.date_enregistrement} />
                    </td>
                    <td className="has-text-centered w-50">
                      <Value
                        value={
                          dossier.contrats_ruptures_fin ||
                          dossier.contrats_ruptures_debut
                        }
                        nonEmptyValues="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Subcategory>
        <Subcategory subtitle="Rupture conventionnelle collective">
          <Data name="Procédure en cours" value={!!rccList.inProcess} />
          {rccList.inProcess && (
            <Data
              name="Date d'enregistrement"
              value={rccList.inProcess.dossier.date_enregistrement}
            />
          )}
          {rccList.validsOrProbates && rccList.validsOrProbates.length ? (
            <table className="table mt-2">
              <thead>
                <tr>
                  <th>Numéro de dossier</th>
                  <th className="has-text-centered">Date d'enregistrement</th>
                  <th className="has-text-centered">Type de RCC</th>
                  <th className="has-text-centered">
                    Nombre maximum de ruptures de contrats de travail envisagées
                  </th>
                </tr>
              </thead>
              <tbody>
                {rccList.validsOrProbates.map((dossier, index) => (
                  <tr key={`pse-${dossier.numero_de_dossier}-${index}`}>
                    <td className="w-25">
                      <Value value={dossier.numero_de_dossier} />
                    </td>
                    <td className="has-text-centered w-20">
                      <Value value={dossier.date_enregistrement} />
                    </td>
                    <td className="has-text-centered w-30">
                      <Value
                        value={
                          dossier.type_de_dossier &&
                          dossier.type_de_dossier.split(":")[1].trim()
                        }
                      />
                    </td>
                    <td className="has-text-centered">
                      <Value
                        value={
                          dossier.contrats_ruptures_fin ||
                          dossier.contrats_ruptures_debut
                        }
                        empty="-"
                        nonEmptyValues="0"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </Subcategory>
      </div>
    </section>
  );
};

EstablishmentMuteco.propTypes = {
  establishment: Proptypes.object.isRequired
};

export default EstablishmentMuteco;
