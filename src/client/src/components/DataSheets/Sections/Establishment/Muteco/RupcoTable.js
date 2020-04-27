import React from "react";
import PropTypes from "prop-types";
import Value from "../../../../shared/Value";
import SeeDetailsLink from "../../SharedComponents/SeeDetailsLink";

const RupcoTable = ({ list, siren, rupcoFiles, hasTypeColumn = false }) => {
  return (
    <table className="table mt-2 rupco-table-establishment">
      <thead>
        <tr>
          {hasTypeColumn && <th>Type</th>}
          <th>Date d{"'"}enregistrement</th>
          <th>Numéro de dossier</th>
          <th>État du dossier</th>
          <th>Nb maximum de ruptures de contrats envisagées</th>
          <th>Autres établissements</th>
        </tr>
      </thead>
      <tbody>
        {list.map(dossier => {
          const hasOtherEstablishments = !!(
            rupcoFiles &&
            rupcoFiles.find(file => file.numero === dossier.numero)
              .etablissements.length > 1
          );

          return (
            <tr key={dossier.numero}>
              {hasTypeColumn && (
                <td className="w-40">
                  <Value value={dossier.type} />
                </td>
              )}
              <td className="has-text-right">
                <Value value={dossier.date_enregistrement} />
              </td>
              <td className="has-text-right">
                <Value value={dossier.numero} />
              </td>
              <td className="w-20">
                <Value value={dossier.etat} />
              </td>
              <td className="has-text-right w-20">
                <Value value={dossier.nombre_de_ruptures} />
              </td>
              <td className="w-30">
                <Value
                  value={
                    hasOtherEstablishments ? (
                      <div>
                        <span className="mr-3">Oui</span>
                        <SeeDetailsLink
                          link={`/enterprise/${siren}/#muteco`}
                          text="Voir la fiche entreprise"
                        />
                      </div>
                    ) : (
                      "Non"
                    )
                  }
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

RupcoTable.propTypes = {
  list: PropTypes.array.isRequired,
  siren: PropTypes.string.isRequired,
  rupcoFiles: PropTypes.arrayOf(PropTypes.object),
  hasTypeColumn: PropTypes.bool
};

export default RupcoTable;
