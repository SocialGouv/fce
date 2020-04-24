import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Value from "../../../../shared/Value";

const RupcoTable = ({ list, siren, hasTypeColumn = false }) => {
  return (
    <table className="table mt-2">
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
        {list.map(dossier => (
          <tr key={dossier.numero}>
            {hasTypeColumn && (
              <td>
                <Value value={dossier.type} />
              </td>
            )}
            <td>
              <Value value={dossier.date_enregistrement} />
            </td>
            <td>
              <Value value={dossier.numero} />
            </td>
            <td>
              <Value value={dossier.etat} />
            </td>
            <td className="has-text-right">
              <Value value={dossier.nombre_de_ruptures} />
            </td>
            <td>
              <Value
                value={
                  !!dossier.autres_etablissements.length ? (
                    <div>
                      <div>Oui</div>
                      <Link to={`/enterprise/${siren}/#muteco`}>
                        Consulter la fiche de l{"'"}entreprise
                      </Link>
                    </div>
                  ) : (
                    "Non"
                  )
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

RupcoTable.propTypes = {
  list: PropTypes.array.isRequired,
  siren: PropTypes.string.isRequired,
  hasTypeColumn: PropTypes.bool
};

export default RupcoTable;
